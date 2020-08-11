import * as M from '../../../src/models'
import { ComponentId, Prefix } from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import { CommandServiceImpl } from '../../../src/clients/command/CommandService'
import * as WsReq from '../../../src/clients/command/models/WsCommand'
import { GatewayComponentCommand } from '../../../src/clients/gateway/models/Gateway'

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')

const mockSubscribe = jest.fn()
const mockSingleResponse = jest.fn()
const callback = () => {}
const client = new CommandServiceImpl(compId, mockHttpTransport(), () =>
  mockWsTransport(mockSubscribe, mockSingleResponse)
)

describe('CommandService', () => {
  test('should subscribe to current state using websocket | ESW-305', () => {
    const stateNames = new Set(['stateName1', 'stateName2'])
    const msg = new WsReq.SubscribeCurrentState(stateNames)

    client.subscribeCurrentState(stateNames)(callback)

    expect(mockSubscribe).toBeCalledWith(
      new GatewayComponentCommand(compId, msg),
      callback,
      M.CurrentState
    )
  })

  test('should receive submit response on query final using websocket | ESW-305', async () => {
    const runId = '12345'
    const timeoutInSeconds = 1000
    const msg = new WsReq.QueryFinal(runId, timeoutInSeconds)

    await client.queryFinal(runId, timeoutInSeconds)

    expect(mockSingleResponse).toBeCalledWith(
      new GatewayComponentCommand(compId, msg),
      M.SubmitResponse
    )
  })
})
