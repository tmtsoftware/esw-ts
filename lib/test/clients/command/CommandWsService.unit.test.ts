import { mocked } from 'ts-jest/utils'
import { CommandServiceImpl } from '../../../src/clients/command/CommandServiceImpl'
import { CommandServicePostMessage } from '../../../src/clients/command/models/PostCommand'
import * as WsReq from '../../../src/clients/command/models/WsCommand'
import { GatewayComponentCommand } from '../../../src/clients/gateway/models/Gateway'
import * as M from '../../../src/models'
import { ComponentId, Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')
const callback = () => ({})
const httpTransport: HttpTransport<GatewayComponentCommand<
  CommandServicePostMessage
>> = new HttpTransport('')
const ws = new Ws('')

const mockedWsTransport = mocked(ws)

const client = new CommandServiceImpl(compId, httpTransport, () => ws)

describe('CommandService', () => {
  test('should subscribe to current state using websocket | ESW-305', () => {
    const stateNames = new Set(['stateName1', 'stateName2'])
    const msg = new WsReq.SubscribeCurrentState(stateNames)

    client.subscribeCurrentState(stateNames)(callback)

    verify(mockedWsTransport.subscribe).toBeCalledWith(
      new GatewayComponentCommand(compId, msg),
      callback,
      M.CurrentStateD
    )
  })

  test('should receive submit response on query final using websocket | ESW-305', async () => {
    const runId = '12345'
    const timeoutInSeconds = 1000
    const msg = new WsReq.QueryFinal(runId, timeoutInSeconds)

    await client.queryFinal(runId, timeoutInSeconds)

    verify(mockedWsTransport.singleResponse).toBeCalledWith(
      new GatewayComponentCommand(compId, msg),
      M.SubmitResponseD
    )
  })
})

afterAll(() => jest.resetAllMocks())
