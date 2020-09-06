import { CommandServiceImpl } from '../../../src/clients/command/CommandServiceImpl'
import * as Req from '../../../src/clients/command/models/PostCommand'
import { Submit } from '../../../src/clients/command/models/PostCommand'
import * as WsReq from '../../../src/clients/command/models/WsCommand'
import { GatewayComponentCommand } from '../../../src/clients/gateway/models/Gateway'
import * as M from '../../../src/models'
import {
  CompletedL,
  CompletedResponse,
  ComponentId,
  LockedL,
  LockedResponse,
  Observe,
  Prefix,
  Result,
  Setup,
  SubmitResponse,
  SubmitResponseD
} from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')
const eswTestPrefix = new Prefix('ESW', 'test')

const mockResponse = Math.random().toString()
const requestRes: jest.Mock = jest.fn().mockReturnValue(mockResponse)
const client = new CommandServiceImpl(compId, mockHttpTransport(requestRes), () =>
  mockWsTransport()
)

describe('CommandService', () => {
  test('should be able to validate command sent to assembly | ESW-305', async () => {
    const setupCommand = new Setup(eswTestPrefix, 'c1', [], ['obsId'])
    const msg = new Req.Validate(setupCommand)

    const response = await client.validate(setupCommand)

    console.log(response)
    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new GatewayComponentCommand(compId, msg), M.ValidateResponseD)
  })

  test('should be able to submit command to assembly | ESW-305', async () => {
    const setupCommand = new Setup(eswTestPrefix, 'c1', [], ['obsId'])
    const msg = new Req.Submit(setupCommand)

    const response = await client.submit(setupCommand)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new GatewayComponentCommand(compId, msg), M.SubmitResponseD)
  })

  test('should be able to send oneway command | ESW-305', async () => {
    const observeCommand = new Observe(eswTestPrefix, 'c1', [])
    const msg = new Req.Oneway(observeCommand)

    const response = await client.oneway(observeCommand)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new GatewayComponentCommand(compId, msg), M.OnewayResponseD)
  })

  test('should be able to send query command | ESW-305', async () => {
    const runId = '1234124'
    const msg = new Req.Query(runId)

    const response = await client.query(runId)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new GatewayComponentCommand(compId, msg), M.SubmitResponseD)
  })

  test('should get completed response on submitAndWait with submit and then queried for final response of long running command | ESW-344', async () => {
    const setupCommand = new Setup(eswTestPrefix, 'c1', [], ['obsId'])
    const mockSubmitResponse = { _type: 'Started', runId: '123' }
    const mockQueryFinalResponse = {
      _type: 'Completed',
      runId: '123',
      result: new Result()
    }

    requestRes.mockResolvedValueOnce(mockSubmitResponse)
    const mockSingleResponse: jest.Mock = jest.fn().mockResolvedValueOnce(mockQueryFinalResponse)
    const assembly = new CommandServiceImpl(compId, mockHttpTransport(requestRes), () =>
      mockWsTransport(jest.fn(), mockSingleResponse)
    )
    const response = await assembly.submitAndWait(setupCommand, 10)

    expect(response).toEqual(mockQueryFinalResponse)
    expect(requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand)),
      M.SubmitResponseD
    )
    expect(mockSingleResponse).toBeCalledWith(
      new GatewayComponentCommand(compId, new WsReq.QueryFinal(mockSubmitResponse.runId, 10)),
      SubmitResponseD
    )
  })

  test('should get completed when for submitAndWait when submit itself returns completed for short running commands| ESW-344', async () => {
    const setupCommand = new Setup(eswTestPrefix, 'c1', [], ['obsId'])
    const mockResponse = {
      _type: 'Completed',
      runId: '123',
      result: new Result()
    }
    requestRes.mockResolvedValueOnce(mockResponse)
    const mockSingleResponse: jest.Mock = jest.fn()
    const assembly = new CommandServiceImpl(compId, mockHttpTransport(requestRes), () =>
      mockWsTransport(jest.fn(), mockSingleResponse)
    )

    const response = await assembly.submitAndWait(setupCommand, 10)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand)),
      M.SubmitResponseD
    )
    // assert that query final is not needed as submit itself returns completed response (NOT started response)
    expect(mockSingleResponse).toBeCalledTimes(0)
  })

  test('should submit all commands and wait for final response | ESW-344', async () => {
    const setupCommand1 = new Setup(eswTestPrefix, 'c1', [], ['obsId'])
    const setupCommand2 = new Setup(eswTestPrefix, 'c2', [], ['obsId'])
    const mockSubmitResponse = { _type: 'Started', runId: '123' }
    const mockQueryFinalResponse = {
      _type: 'Completed',
      runId: '123',
      result: new Result()
    }

    requestRes.mockResolvedValue(mockSubmitResponse)
    const mockSingleResponse: jest.Mock = jest.fn().mockResolvedValue(mockQueryFinalResponse)
    const assembly = new CommandServiceImpl(compId, mockHttpTransport(requestRes), () =>
      mockWsTransport(jest.fn(), mockSingleResponse)
    )
    const response = await assembly.submitAllAndWait([setupCommand1, setupCommand2], 10)

    expect(response).toEqual([mockQueryFinalResponse, mockQueryFinalResponse])
    expect(requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand1)),
      M.SubmitResponseD
    )
    expect(requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand2)),
      M.SubmitResponseD
    )
    expect(mockSingleResponse).toBeCalledWith(
      new GatewayComponentCommand(compId, new WsReq.QueryFinal(mockSubmitResponse.runId, 10)),
      SubmitResponseD
    )
    expect(requestRes).toBeCalledTimes(2)
    expect(mockSingleResponse).toBeCalledTimes(2)
  })

  test('should submit commands till each command response is Non negative | ESW-344', async () => {
    const setupCommand1 = new Setup(eswTestPrefix, 'c1', [], ['obsId1'])
    const setupCommand2 = new Setup(eswTestPrefix, 'c2', [], ['obsId2'])
    const setupCommand3 = new Setup(eswTestPrefix, 'c3', [], ['obsId3'])
    const completedResponse = (runId: string): CompletedResponse => ({
      _type: CompletedL,
      runId: runId,
      result: new Result()
    })

    const lockedResponse: LockedResponse = {
      _type: LockedL,
      runId: '567'
    }
    const expectedResponse: SubmitResponse[] = [completedResponse('c1')]

    requestRes.mockImplementation((gatewayComponentCommand: GatewayComponentCommand<Submit>) => {
      let response: SubmitResponse
      switch (gatewayComponentCommand.command.controlCommand.commandName) {
        case 'c1':
          response = completedResponse('c1')
          break
        case 'c2':
          response = lockedResponse
          break
        case 'c3':
          throw 'command c3 should not be submitted as c2 command response is negative command response'
        default:
          response = completedResponse('random')
      }
      return Promise.resolve(response)
    })
    const assembly = new CommandServiceImpl(compId, mockHttpTransport(requestRes), () =>
      mockWsTransport()
    )

    const response = await assembly.submitAllAndWait(
      [setupCommand1, setupCommand2, setupCommand3],
      10
    )

    expect(requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand1)),
      M.SubmitResponseD
    )
    expect(requestRes).toBeCalledTimes(2)
    expect(response).toEqual(expectedResponse)
  })
})

afterEach(() => jest.clearAllMocks())
