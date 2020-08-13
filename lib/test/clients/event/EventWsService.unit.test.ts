import {
  Event,
  EventKey,
  EventName,
  Subscribe,
  SubscribeWithPattern
} from '../../../src/clients/event'
import { Prefix, Subsystem } from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'

import { EventServiceImpl } from '../../../src/clients/event/Impl'

const prefix = new Prefix('ESW', 'eventComp')
const eventName = new EventName('offline')
const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
const subsystem: Subsystem = 'ESW'

const httpTransport = mockHttpTransport()
const mockSubscribe = jest.fn()
const callback = () => ({})
const eventServiceImpl = new EventServiceImpl(httpTransport, () => mockWsTransport(mockSubscribe))

describe('Event Service', () => {
  test('should subscribe event without default parameters using websocket | ESW-318', () => {
    eventServiceImpl.subscribe(eventKeys, 1)(callback)

    expect(mockSubscribe).toBeCalledWith(new Subscribe([...eventKeys], 1), callback, Event)
  })

  test('should subscribe event with default parameters using websocket | ESW-318', () => {
    eventServiceImpl.subscribe(eventKeys)(callback)

    expect(mockSubscribe).toBeCalledWith(new Subscribe([...eventKeys], 0), callback, Event)
  })

  test('should pattern subscribe event using websocket | ESW-318', () => {
    eventServiceImpl.pSubscribe(subsystem, 1, '.*')(callback)

    expect(mockSubscribe).toBeCalledWith(
      new SubscribeWithPattern(subsystem, 1, '.*'),
      callback,
      Event
    )
  })

  test('should pattern subscribe event with default parameters using websocket | ESW-318', () => {
    eventServiceImpl.pSubscribe(subsystem)(callback)

    expect(mockSubscribe).toBeCalledWith(
      new SubscribeWithPattern(subsystem, 0, '.*'),
      callback,
      Event
    )
  })
})
afterEach(() => jest.clearAllMocks())
