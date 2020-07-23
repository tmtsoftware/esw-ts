import { mocked } from 'ts-jest/utils'
import { post } from '../../../src/utils/Http'
import { EventKey, EventName, EventService, ObserveEvent } from '../../../src/clients/event'
import { Prefix, Subsystem } from '../../../src/models'
import { HttpLocation } from '../../../src/clients/location'
import { GatewayConnection } from '../../../src/clients/gateway/ResolveGateway'
import { Server } from 'mock-socket'
import { wsMockWithResolved } from '../../helpers/MockHelpers'

jest.mock('../../../src/utils/Http')
const postMockFn = mocked(post, true)
let mockServer: Server

const uri = 'http://localhost:8080'
const gatewayLocation: HttpLocation = { _type: 'HttpLocation', connection: GatewayConnection, uri }
const prefix = new Prefix('ESW', 'eventComp')
const eventName = new EventName('offline')
const observeEvent = new ObserveEvent(
  'event1',
  prefix,
  eventName,
  new Date(2020, 1, 1).toISOString(),
  []
)

beforeEach(() => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})

describe('Event Service', () => {
  test('should subscribe event using websocket | ESW-318', async () => {
    postMockFn.mockResolvedValueOnce([gatewayLocation])
    wsMockWithResolved(observeEvent, mockServer)

    return new Promise((jestDoneCallback) => {
      const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])

      new EventService().subscribe(eventKeys, 1, (event) => {
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        jestDoneCallback()
      })
    })
  })

  test('should pattern subscribe event using websocket | ESW-318', async () => {
    postMockFn.mockResolvedValueOnce([gatewayLocation])
    wsMockWithResolved(observeEvent, mockServer)
    const subsystem: Subsystem = 'ESW'

    return new Promise((jestDoneCallback) => {
      new EventService().pSubscribe(subsystem, 1, '*', (event) => {
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        jestDoneCallback()
      })
    })
  })
})

afterEach(() => jest.clearAllMocks())
