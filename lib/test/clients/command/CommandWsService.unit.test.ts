import { CommandService } from '../../../src/clients/command'
import { GatewayConnection } from '../../../src/clients/gateway/ResolveGateway'
import { HttpLocation } from '../../../src/clients/location'
import { Server } from 'mock-socket'
import { Completed, ComponentId, CurrentState, Prefix } from '../../../src/models'
import { mocked } from 'ts-jest/utils'
import { wsMockWithResolved } from '../../helpers/MockHelpers'
import { post } from '../../../src/utils/Http'

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')

const client = new CommandService(compId, () => '')
let mockServer: Server

jest.mock('../../../src/utils/Http')
const postMockFn = mocked(post, true)

const uri = 'http://localhost:8080'
const gatewayLocation = new HttpLocation(GatewayConnection, uri)

beforeEach(() => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})
describe('CommandService', () => {
  test('should subscribe to current state using websocket | ESW-305', () => {
    const expectedState: CurrentState = {
      prefix: 'CSW.ncc.trombone',
      stateName: 'stateName1'
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    wsMockWithResolved(expectedState, mockServer)

    return new Promise((done) => {
      client.subscribeCurrentState(
        new Set(['stateName1', 'stateName2']),
        (currentState: CurrentState) => {
          expect(currentState).toEqual(expectedState)
          done()
        }
      )
    })
  })

  test('should receive submit response on query final using websocket | ESW-305', async () => {
    const completedResponse: Completed = {
      _type: 'Completed',
      runId: '1234124',
      result: { paramSet: [] }
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    wsMockWithResolved(completedResponse, mockServer)

    const submitResponse = await client.queryFinal('12345', 1000)

    expect(submitResponse).toEqual(completedResponse)
  })
})
