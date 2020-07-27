import { mocked } from 'ts-jest/utils'
import { post } from '../../../src/utils/Http'
import { EventKey, EventName, EventService, ObserveEvent, Event } from '../../../src/clients/event'
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
const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
const subsystem: Subsystem = 'ESW'

beforeEach(() => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})

describe('Event Service', () => {
  test('should subscribe event without default parameters using websocket | ESW-318', async () => {
    postMockFn.mockResolvedValueOnce([gatewayLocation])
    wsMockWithResolved(observeEvent, mockServer)

    return new Promise(async (jestDoneCallback) => {
      const callback = (event: Event) => {
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        subscription.cancel()
        jestDoneCallback()
      }
      const subscription = await new EventService().subscribe(eventKeys, 1)(callback)
    })
  })

  test('should subscribe event with default parameters using websocket | ESW-318', async () => {
    postMockFn.mockResolvedValueOnce([gatewayLocation])
    wsMockWithResolved(observeEvent, mockServer)

    return new Promise(async (jestDoneCallback) => {
      const callback = (event: Event) => {
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        subscription.cancel()
        jestDoneCallback()
      }
      const subscription = await new EventService().subscribe(eventKeys)(callback)
    })
  })

  test('should pattern subscribe event using websocket | ESW-318', () => {
    postMockFn.mockResolvedValueOnce([gatewayLocation])
    wsMockWithResolved(observeEvent, mockServer)

    return new Promise(async (jestDoneCallback) => {
      const callback = (event: Event) => {
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        jestDoneCallback()
        subscription.cancel()
      }
      const subscription = await new EventService().pSubscribe(subsystem, 1, '*')(callback)
    })
  })

  test('should pattern subscribe event with default parameters using websocket | ESW-318', () => {
    postMockFn.mockResolvedValueOnce([gatewayLocation])
    wsMockWithResolved(observeEvent, mockServer)

    return new Promise(async (jestDoneCallback) => {
      const callback = (event: Event) => {
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        jestDoneCallback()
        subscription.cancel()
      }
      const subscription = await new EventService().pSubscribe(subsystem)(callback)
    })
  })
})

afterEach(() => jest.clearAllMocks())
