import { ComponentId, Prefix, SubmitResponse } from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import { GatewaySequencerCommand } from '../../../src/clients/gateway/models/Gateway'
import { QueryFinal } from '../../../src/clients/sequencer/models/WsCommand'
import { SequencerServiceImpl } from '../../../src/clients/sequencer/SequencerServiceImpl'

const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const mockSingleResponse = jest.fn()
const sequencer = new SequencerServiceImpl(componentId, mockHttpTransport(jest.fn()), () =>
  mockWsTransport(jest.fn(), mockSingleResponse)
)

test('SequencerService should receive submit response on query final using websocket | ESW-307', async () => {
  await sequencer.queryFinal('12345', 1000)

  expect(mockSingleResponse).toBeCalledWith(
    new GatewaySequencerCommand(componentId, new QueryFinal('12345', 1000)),
    SubmitResponse
  )
})
