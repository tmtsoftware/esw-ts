import { Server } from 'mock-socket'
import { SubmitResponse } from 'models/params/CommandResponse'
import { wsMockWithResolved } from '__tests__/utils/MockHelpers'
import { SequencerService } from 'clients'
import { ComponentId } from 'models/ComponentId'
import { Prefix } from 'models/params/Prefix'

let mockServer: Server
const componentId = ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const sequencer = new SequencerService('localhost', 8080, componentId)

beforeEach(() => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})

test('it should recieve submit response on query final using websocket', async () => {
  const completedResponse: SubmitResponse = {
    _type: 'Completed',
    runId: '1234124'
  }

  await wsMockWithResolved(completedResponse, mockServer)
  const submitResponse = await sequencer.queryFinal('12345', 1000)

  expect(submitResponse).toEqual(completedResponse)
})
