import { Server } from 'mock-socket'
import { mocked } from 'ts-jest/utils'
import { GatewayConnection } from '../../../src/clients/gateway/ResolveGateway'
import { HttpLocation } from '../../../src/clients/location'
import { ComponentId, CurrentState, Prefix, SubmitResponse } from '../../../src/models'
import { post } from '../../../src/utils/Http'
import { mockHttpTransport, wsMockWithResolved } from '../../helpers/MockHelpers'
import { CommandServiceImpl } from '../../../src/clients/command/CommandService'

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')

const client = new CommandServiceImpl(compId, mockHttpTransport())
let mockServer: Server

jest.mock('../../../src/utils/Http')
const postMockFn = mocked(post, true)

const uri = 'http://localhost:8080'
const gatewayLocation: HttpLocation = { _type: 'HttpLocation', connection: GatewayConnection, uri }

beforeEach(() => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})
describe('CommandService', () => {
  test('should subscribe to current state using websocket | ESW-305', () => {
    const expectedState: CurrentState = {
      prefix: new Prefix('CSW', 'ncc.trombone'),
      stateName: 'stateName1',
      paramSet: []
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    wsMockWithResolved(expectedState, mockServer)

    return new Promise((done) => {
      const callback = (currentState: CurrentState) => {
        expect(currentState).toEqual(expectedState)
        done()
      }
      client.subscribeCurrentState(new Set(['stateName1', 'stateName2']))(callback)
    })
  })

  test('should receive submit response on query final using websocket | ESW-305', async () => {
    const completedResponse: SubmitResponse = {
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
