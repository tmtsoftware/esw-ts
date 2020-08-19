import { ComponentId, Observe, Prefix, Setup } from '../../../src/models'
import { CommandServiceImpl } from '../../../src/clients/command/CommandServiceImpl'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import * as Req from '../../../src/clients/command/models/PostCommand'
import { GatewayComponentCommand } from '../../../src/clients/gateway/models/Gateway'
import * as M from '../../../src/models'

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')
const eswTestPrefix = new Prefix('ESW', 'test')

const requestRes: jest.Mock = jest.fn()
const client = new CommandServiceImpl(compId, mockHttpTransport(requestRes), () =>
  mockWsTransport()
)

describe('CommandService', () => {
  test('should be able to validate command sent to assembly | ESW-305', async () => {
    const setupCommand = new Setup(eswTestPrefix, 'c1', [], ['obsId'])
    const msg = new Req.Validate(setupCommand)

    await client.validate(setupCommand)

    expect(requestRes).toBeCalledWith(new GatewayComponentCommand(compId, msg), M.ValidateResponse)
  })

  test('should be able to submit command to assembly | ESW-305', async () => {
    const setupCommand = new Setup(eswTestPrefix, 'c1', [], ['obsId'])
    const msg = new Req.Submit(setupCommand)

    await client.submit(setupCommand)

    expect(requestRes).toBeCalledWith(new GatewayComponentCommand(compId, msg), M.SubmitResponse)
  })

  test('should be able to send oneway command | ESW-305', async () => {
    const observeCommand = new Observe(eswTestPrefix, 'c1', [])
    const msg = new Req.Oneway(observeCommand)

    await client.oneway(observeCommand)

    expect(requestRes).toBeCalledWith(new GatewayComponentCommand(compId, msg), M.OnewayResponse)
  })

  test('should be able to send query command | ESW-305', async () => {
    const runId = '1234124'
    await client.query(runId)
    const msg = new Req.Query(runId)

    expect(requestRes).toBeCalledWith(new GatewayComponentCommand(compId, msg), M.SubmitResponse)
  })
})

afterEach(() => jest.clearAllMocks())
