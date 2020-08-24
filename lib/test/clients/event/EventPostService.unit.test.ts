import { EventKey, EventName, ObserveEvent, SystemEvent } from '../../../src/clients/event'
import { EventServiceImpl } from '../../../src/clients/event/EventServiceImpl'
import { GetEvent, PublishEvent } from '../../../src/clients/event/models/PostCommand'
import { Done } from '../../../src/clients/location'
import { Prefix } from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'

const requestRes: jest.Mock = jest.fn()

const client = new EventServiceImpl(mockHttpTransport(requestRes), () => mockWsTransport())
describe('Event Service', () => {
  test('should publish system event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const systemEvent = new SystemEvent(prefix, eventName, [])
    await client.publish(systemEvent)

    expect(requestRes).toBeCalledWith(new PublishEvent(systemEvent), Done)
  })

  test('should publish observe event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const observeEvent = new ObserveEvent(prefix, eventName, [])
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
