import { Server } from 'mock-socket'
import { wsMockWithResolved } from 'utils/MockHelpers'
import { CommandService } from 'clients/command'
import { Completed, ComponentId, CurrentState, Prefix } from 'models'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'
import { HttpConnection, HttpLocation } from 'clients/location'

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')

const client = new CommandService(compId)
let mockServer: Server

jest.mock('utils/Http')
const postMockFn = mocked(post, true)

const uri = 'http://localhost:8080'
const prefix = new Prefix('ESW', 'Gateway')
const httpConnection = new HttpConnection(prefix, 'Service')
const gatewayLocation = new HttpLocation(httpConnection, uri)

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

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    await wsMockWithResolved(expectedState, mockServer)
    await client.subscribeCurrentState(
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

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    await wsMockWithResolved(completedResponse, mockServer)

    const submitResponse = await client.queryFinal('12345', 1000)

    expect(submitResponse).toEqual(completedResponse)
  })
})
