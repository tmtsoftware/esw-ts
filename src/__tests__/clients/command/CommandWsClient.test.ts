import { Server } from 'mock-socket'
import { CurrentState } from 'models/params/CurrentState'
import { SubmitResponse } from 'clients/command/models/CommandResponse'
import { CommandService } from 'clients'
import { ComponentId } from 'models/ComponentId'
import { Prefix } from 'models/params/Prefix'

const compId: ComponentId = ComponentId(new Prefix('ESW', 'test'), 'Assembly')

const client = CommandService('localhost', 8080, compId)
let mockServer: Server

beforeEach(() => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})

test('it should subscribe to current state using websocket', async () => {
  const expectedState: CurrentState = {
    prefix: 'CSW.ncc.trombone',
    stateName: 'stateName1'
  }

  await wsMockWithResolved(expectedState, mockServer)
  client.subscribeCurrentState(
    new Set(['stateName1', 'stateName2']),
    (currentState: CurrentState) => {
      expect(currentState).toEqual(expectedState)
    }
  )
})

test('it should recieve submit response on query final using websocket', async () => {
  const completedResponse: SubmitResponse = {
    _type: 'Completed',
    runId: '1234124'
  }

  await wsMockWithResolved(completedResponse, mockServer)
  const submitResponse = await client.queryFinal('12345', 1000)

  expect(submitResponse).toEqual(completedResponse)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wsMockWithResolved = async (data: any, mockServer: Server) => {
  mockServer.on('connection', (socket) => {
    socket.on('message', () => socket.send(JSON.stringify(data)))
  })
}
