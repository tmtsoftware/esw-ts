import { Server } from 'mock-socket'
import { CurrentState } from 'models/params/CurrentState'
import { SubmitResponse } from 'models/params/CommandResponse'
import { CommandService } from 'clients'
import { ComponentId } from 'models/ComponentId'
import { Prefix } from 'models/params/Prefix'
import { wsMockWithResolved } from '__tests__/utils/MockHelpers'

const compId: ComponentId = ComponentId(new Prefix('ESW', 'test'), 'Assembly')

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

  test('should recieve submit response on query final using websocket', async () => {
    const completedResponse: SubmitResponse = {
      _type: 'Completed',
      runId: '1234124'
    }

    await wsMockWithResolved(completedResponse, mockServer)
    const submitResponse = await client.queryFinal('12345', 1000)

    expect(submitResponse).toEqual(completedResponse)
  })
})
