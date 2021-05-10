import { mocked } from 'ts-jest/utils'
import { GatewaySequencerCommand } from '../../../src/clients/gateway/models/Gateway'
import type * as Req from '../../../src/clients/sequencer/models/PostCommand'
import {
  QueryFinal,
  SequencerWebsocketRequest,
  SubscribeSequencerState
} from '../../../src/clients/sequencer/models/WsCommand'
import { SequencerServiceImpl } from '../../../src/clients/sequencer/SequencerServiceImpl'
import { SubmitResponseD } from '../../../src/decoders/CommandDecoders'
import { SequencerStateResponseD } from '../../../src/decoders/SequencerDecoders'
import { ComponentId, Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')
const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')

const httpTransport: HttpTransport<
  GatewaySequencerCommand<Req.SequencerPostRequest>
> = new HttpTransport('someUrl', () => undefined)

const ws: Ws<GatewaySequencerCommand<SequencerWebsocketRequest>> = new Ws('someUrl')
const mockWs = mocked(ws)
const sequencer = new SequencerServiceImpl(componentId, httpTransport, () => ws)

test('SequencerService should receive submit response on query final using websocket | ESW-307', async () => {
  await sequencer.queryFinal('12345', 1000)

  verify(mockWs.singleResponse).toBeCalledWith(
    new GatewaySequencerCommand(componentId, new QueryFinal('12345', 1000)),
    SubmitResponseD
  )
})
test('SequencerService should receive sequencer state response on subscribe sequencer state using websocket | ESW-307', async () => {
  const callback = () => ({})
  await sequencer.subscribeSequencerState()(callback)

  verify(mockWs.subscribe).toBeCalledWith(
    new GatewaySequencerCommand(componentId, new SubscribeSequencerState()),
    callback,
    SequencerStateResponseD
  )
})
