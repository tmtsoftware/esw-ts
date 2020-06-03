import { GatewayConnection } from '../../../src/clients/gateway/resolveGateway'
import { HttpLocation } from '../../../src/clients/location'
import { SequencerService } from '../../../src/clients/sequencer'
import { Server } from 'mock-socket'
import { ComponentId, Prefix, SubmitResponse } from '../../../src/models'
import { mocked } from 'ts-jest/utils'
import { wsMockWithResolved } from '../../utils/MockHelpers'
import { post } from '../../../src/utils/Post'

jest.mock('utils/post')
const postMockFn = mocked(post, true)

const uri = 'http://localhost:8080'
const gatewayLocation = new HttpLocation(GatewayConnection, uri)
let mockServer: Server
const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const sequencer = new SequencerService(componentId, () => '')

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
  postMockFn.mockResolvedValue([gatewayLocation])
  wsMockWithResolved(completedResponse, mockServer)
  const submitResponse = await sequencer.queryFinal('12345', 1000)

  expect(submitResponse).toEqual(completedResponse)
})
