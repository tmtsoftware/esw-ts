import { EventKey, EventName, ObserveEvent, SystemEvent } from '../../../src/clients/event'
import { EventServiceImpl } from '../../../src/clients/event/EventServiceImpl'
import { GetEvent, PublishEvent } from '../../../src/clients/event/models/PostCommand'
import { DoneD } from '../../../src/clients/location'
import { Prefix } from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'

const mockResponse = Math.random().toString()
const requestRes: jest.Mock = jest.fn().mockReturnValue(Promise.resolve(mockResponse))
const client = new EventServiceImpl(mockHttpTransport(requestRes), () => mockWsTransport())

describe('Event Service', () => {
  test('should publish system event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const systemEvent = SystemEvent.make(prefix, eventName, [])
    const response = await client.publish(systemEvent)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new PublishEvent(systemEvent), DoneD)
  })

  test('should publish observe event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const observeEvent = ObserveEvent.make(prefix, eventName, [])
    const response = await client.publish(observeEvent)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new PublishEvent(observeEvent), DoneD)
  })

  test('should get event using post | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])

    const response = await client.get(eventKeys)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new GetEvent([...eventKeys]), expect.anything())
  })
})

afterEach(() => jest.clearAllMocks())
