import { SequencerService } from 'clients'
import { Server } from 'mock-socket'
import { ComponentId } from 'models/ComponentId'
import { SubmitResponse } from 'models/params/CommandResponse'
import { Prefix } from 'models/params/Prefix'
import { wsMockWithResolved } from 'utils/MockHelpers'

let mockServer: Server
const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const sequencer = new SequencerService('localhost', 8080, componentId)

beforeEach(() => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})

test('SequencerService should receive submit response on query final using websocket', async () => {
  const completedResponse: SubmitResponse = {
    _type: 'Completed',
    runId: '1234124'
  }

  await wsMockWithResolved(completedResponse, mockServer)
  const submitResponse = await sequencer.queryFinal('12345', 1000)

  expect(submitResponse).toEqual(completedResponse)
})
