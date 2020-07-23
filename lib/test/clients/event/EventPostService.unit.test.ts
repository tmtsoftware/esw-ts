import { mocked } from 'ts-jest/utils'
import { post } from '../../../src/utils/Http'
import {
  EventKey,
  EventName,
  EventService,
  ObserveEvent,
  SystemEvent
} from '../../../src/clients/event'
import { Prefix } from '../../../src/models'
import { Done, HttpLocation } from '../../../src/clients/location'
import { GatewayConnection } from '../../../src/clients/gateway/ResolveGateway'

jest.mock('../../../src/utils/Http')
const postMockFn = mocked(post, true)
const uri = 'http://localhost:8080'
const gatewayLocation: HttpLocation = { _type: 'HttpLocation', connection: GatewayConnection, uri }

let client = new EventService()
describe('Event Service', () => {
  test('should publish event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const observeEvent = new ObserveEvent(
      'event1',
      prefix,
      eventName,
      new Date(2020, 1, 1).toISOString(),
      []
    )
    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(Done)

    let response = await client.publish(observeEvent)

    expect(postMockFn).toBeCalledTimes(2)
    expect(response).toBe(Done)
  })

  test('should get event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const systemEvent = new SystemEvent(
      'event2',
      prefix,
      eventName,
      new Date(2020, 1, 1).toISOString(),
      []
    )
    const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(systemEvent)

    let response = await client.get(eventKeys)

    expect(postMockFn).toBeCalledTimes(2)
    expect(response).toEqual(systemEvent)
  })
})

afterEach(() => jest.clearAllMocks())
