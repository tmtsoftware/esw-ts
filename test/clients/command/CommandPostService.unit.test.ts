import { mocked } from 'ts-jest/utils'
import { CommandServiceImpl } from '../../../src/clients/command/CommandServiceImpl'
import type {
  CommandServicePostMessage,
  Submit
} from '../../../src/clients/command/models/PostCommand'
import * as Req from '../../../src/clients/command/models/PostCommand'
import * as WsReq from '../../../src/clients/command/models/WsCommand'
import { GatewayComponentCommand } from '../../../src/clients/gateway/models/Gateway'
import {
  OnewayResponseD,
  SubmitResponseD,
  ValidateResponseD
} from '../../../src/decoders/CommandDecoders'
import * as M from '../../../src/models'
import type {
  OnewayResponse,
  SubmitResponse,
  ValidateResponse
} from '../../../src/models/params/CommandResponse'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const compId: M.ComponentId = new M.ComponentId(new M.Prefix('ESW', 'test'), 'Assembly')
const eswTestPrefix = new M.Prefix('ESW', 'test')

const httpTransport: HttpTransport<GatewayComponentCommand<Req.CommandServicePostMessage>> =
  new HttpTransport('')
const ws = new Ws('')
const mockedHttpTransport = mocked(httpTransport)
const mockedWsTransport = mocked(ws)
const client = new CommandServiceImpl(compId, httpTransport, () => ws)

describe('CommandService', () => {
  test('should be able to validate command sent to assembly | ESW-305', async () => {
    const expectedResponse: ValidateResponse = {
      _type: 'Accepted',
      runId: '1234'
    }
    mockedHttpTransport.requestRes.mockResolvedValueOnce(expectedResponse)

    const setupCommand = new M.Setup(eswTestPrefix, 'c1', [], 'obsId')
    const msg = new Req.Validate(setupCommand)

    const response = await client.validate(setupCommand)

    expect(response).toEqual(expectedResponse)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, msg),
      ValidateResponseD
    )
  })

  test('should be able to submit command to assembly | ESW-305', async () => {
    const expectedResponse: SubmitResponse = {
      _type: 'Started',
      runId: '1234'
    }
    mockedHttpTransport.requestRes.mockResolvedValueOnce(expectedResponse)

    const setupCommand = new M.Setup(eswTestPrefix, 'c1', [], 'obsId')
    const msg = new Req.Submit(setupCommand)

    const response = await client.submit(setupCommand)

    expect(response).toEqual(expectedResponse)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, msg),
      SubmitResponseD
    )
  })

  test('should be able to send oneway command | ESW-305', async () => {
    const expectedResponse: OnewayResponse = {
      _type: 'Accepted',
      runId: '1234'
    }
    mockedHttpTransport.requestRes.mockResolvedValueOnce(expectedResponse)

    const observeCommand = new M.Observe(eswTestPrefix, 'c1', [])
    const msg = new Req.Oneway(observeCommand)

    const response = await client.oneway(observeCommand)

    expect(response).toEqual(expectedResponse)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, msg),
      OnewayResponseD
    )
  })

  test('should be able to send query command | ESW-305', async () => {
    const expectedResponse: SubmitResponse = {
      _type: 'Started',
      runId: '1234124'
    }
    mockedHttpTransport.requestRes.mockResolvedValueOnce(expectedResponse)

    const runId = '1234124'
    const msg = new Req.Query(runId)

    const response = await client.query(runId)

    expect(response).toEqual(expectedResponse)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, msg),
      SubmitResponseD
    )
  })

  test('should get completed response on submitAndWait with submit and then queried for final response of long running command | ESW-344', async () => {
    const setupCommand = new M.Setup(eswTestPrefix, 'c1', [], 'obsId')
    const mockSubmitResponse = { _type: 'Started', runId: '123' }
    const mockQueryFinalResponse = {
      _type: 'Completed',
      runId: '123',
      result: new M.Result()
    }

    mockedHttpTransport.requestRes.mockResolvedValueOnce(mockSubmitResponse)
    mockedWsTransport.singleResponse.mockResolvedValueOnce(mockQueryFinalResponse)

    const response = await client.submitAndWait(setupCommand, 10)

    expect(response).toEqual(mockQueryFinalResponse)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand)),
      SubmitResponseD
    )
    verify(mockedWsTransport.singleResponse).toBeCalledWith(
      new GatewayComponentCommand(compId, new WsReq.QueryFinal(mockSubmitResponse.runId, 10)),
      SubmitResponseD
    )
  })

  test('should get completed when for submitAndWait when submit itself returns completed for short running commands| ESW-344', async () => {
    const setupCommand = new M.Setup(eswTestPrefix, 'c1', [], 'obsId')
    const mockResponse = {
      _type: 'Completed',
      runId: '123',
      result: new M.Result()
    }
    mockedHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await client.submitAndWait(setupCommand, 10)

    expect(response).toEqual(mockResponse)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand)),
      SubmitResponseD
    )
    // assert that query final is not needed as submit itself returns completed response (NOT started response)
    expect(mockedWsTransport.singleResponse).toBeCalledTimes(0)
  })

  test('should submit all commands and wait for final response | ESW-344', async () => {
    const setupCommand1 = new M.Setup(eswTestPrefix, 'c1', [], 'obsId')
    const setupCommand2 = new M.Setup(eswTestPrefix, 'c2', [], 'obsId')
    const mockSubmitResponse = { _type: 'Started', runId: '123' }
    const mockQueryFinalResponse = {
      _type: 'Completed',
      runId: '123',
      result: new M.Result()
    }

    mockedHttpTransport.requestRes.mockResolvedValue(mockSubmitResponse)
    mockedWsTransport.singleResponse.mockResolvedValue(mockQueryFinalResponse)

    const response = await client.submitAllAndWait([setupCommand1, setupCommand2], 10)

    expect(response).toEqual([mockQueryFinalResponse, mockQueryFinalResponse])
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand1)),
      SubmitResponseD
    )
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand2)),
      SubmitResponseD
    )
    verify(mockedWsTransport.singleResponse).toBeCalledWith(
      new GatewayComponentCommand(compId, new WsReq.QueryFinal(mockSubmitResponse.runId, 10)),
      SubmitResponseD
    )
    expect(mockedHttpTransport.requestRes).toBeCalledTimes(2)
    expect(mockedWsTransport.singleResponse).toBeCalledTimes(2)
  })

  test('should submit commands till each command response is Non negative | ESW-344', async () => {
    const setupCommand1 = new M.Setup(eswTestPrefix, 'c1', [], 'obsId1')
    const setupCommand2 = new M.Setup(eswTestPrefix, 'c2', [], 'obsId2')
    const setupCommand3 = new M.Setup(eswTestPrefix, 'c3', [], 'obsId3')
    const completedResponse = (runId: string): M.Completed => ({
      _type: 'Completed',
      runId: runId,
      result: new M.Result()
    })

    const lockedResponse: M.Locked = {
      _type: 'Locked',
      runId: '567'
    }
    const expectedResponse: M.SubmitResponse[] = [completedResponse('c1')]

    mockedHttpTransport.requestRes.mockImplementation(
      (componentCommand: GatewayComponentCommand<CommandServicePostMessage>) => {
        let response: M.SubmitResponse
        const gatewayComponentCommand = componentCommand as GatewayComponentCommand<Submit>

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
      }
    )

    const response = await client.submitAllAndWait(
      [setupCommand1, setupCommand2, setupCommand3],
      10
    )

    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GatewayComponentCommand(compId, new Req.Submit(setupCommand1)),
      SubmitResponseD
    )
    expect(mockedHttpTransport.requestRes).toBeCalledTimes(2)
    expect(response).toEqual(expectedResponse)
  })
})

afterEach(() => jest.clearAllMocks())
