import { CommandServiceImpl } from '../../../src/clients/command/CommandServiceImpl'
import * as Req from '../../../src/clients/command/models/PostCommand'
import { GatewayComponentCommand } from '../../../src/clients/gateway/models/Gateway'
import * as M from '../../../src/models'
import { ComponentId, Observe, Prefix, Setup } from '../../../src/models'
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
})

afterEach(() => jest.clearAllMocks())
