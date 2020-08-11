import { Event, EventKey, EventName } from '../../../src/clients/event'
import { Prefix, Subsystem } from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import { EventServiceImpl } from '../../../src/clients/event/EventService'
import {
  Subscribe,
  SubscribeWithPattern
} from '../../../src/clients/event/models/WebSocketMessages'

const prefix = new Prefix('ESW', 'eventComp')
const eventName = new EventName('offline')
const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
const subsystem: Subsystem = 'ESW'

const httpTransport = mockHttpTransport()
const mockSubscribe = jest.fn()
const callback = () => {}
const eventServiceImpl = new EventServiceImpl(httpTransport, (): any =>
  mockWsTransport(mockSubscribe)
)
describe('Event Service', () => {
  test('should subscribe event without default parameters using websocket | ESW-318', async () => {
    await eventServiceImpl.subscribe(eventKeys, 1)(callback)

    expect(mockSubscribe).toBeCalledWith(new Subscribe([...eventKeys], 1), callback, Event)
  })

  test('should subscribe event with default parameters using websocket | ESW-318', async () => {
    await eventServiceImpl.subscribe(eventKeys)(callback)

    expect(mockSubscribe).toBeCalledWith(new Subscribe([...eventKeys], 0), callback, Event)
  })

  test('should pattern subscribe event using websocket | ESW-318', async () => {
    await eventServiceImpl.pSubscribe(subsystem, 1, '.*')(callback)

    expect(mockSubscribe).toBeCalledWith(
      new SubscribeWithPattern(subsystem, 1, '.*'),
      callback,
      Event
    )
  })

  test('should pattern subscribe event with default parameters using websocket | ESW-318', async () => {
    await eventServiceImpl.pSubscribe(subsystem)(callback)

    expect(mockSubscribe).toBeCalledWith(
      new SubscribeWithPattern(subsystem, 0, '.*'),
      callback,
      Event
    )
  })
})
afterEach(() => jest.clearAllMocks())
