import { CommandService } from 'clients'
import { Server } from 'mock-socket'
import { ComponentId } from 'models/ComponentId'
import { Completed } from 'models/params/CommandResponse'
import { CurrentState } from 'models/params/CurrentState'
import { Prefix } from 'models/params/Prefix'
import { wsMockWithResolved } from 'utils/MockHelpers'

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')

const client = new CommandService('localhost', 8080, compId)
let mockServer: Server

beforeEach(() => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})
describe('CommandService', () => {
  test('should subscribe to current state using websocket', async () => {
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

  test('should receive submit response on query final using websocket', async () => {
    const completedResponse: Completed = {
      _type: 'Completed',
      runId: '1234124',
      result: { paramSet: [] }
    }

    await wsMockWithResolved(completedResponse, mockServer)
    const submitResponse = await client.queryFinal('12345', 1000)

    expect(submitResponse).toEqual(completedResponse)
  })
})
