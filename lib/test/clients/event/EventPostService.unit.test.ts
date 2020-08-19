import {
  EventKey,
  EventName,
  GetEvent,
  ObserveEvent,
  PublishEvent
} from '../../../src/clients/event'
import { Done } from '../../../src/clients/location'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import { Prefix } from '../../../src/models'
import { EventServiceImpl } from '../../../src/clients/event/EventServiceImpl'

const requestRes: jest.Mock = jest.fn()

const client = new EventServiceImpl(mockHttpTransport(requestRes), () => mockWsTransport())
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
    await client.publish(observeEvent)

    expect(requestRes).toBeCalledWith(new PublishEvent(observeEvent), Done)
  })

  test('should get event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])

    await client.get(eventKeys)

    expect(requestRes).toBeCalledWith(new GetEvent([...eventKeys]), expect.anything())
  })
})

afterEach(() => jest.clearAllMocks())
