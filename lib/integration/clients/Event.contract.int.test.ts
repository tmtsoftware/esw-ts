import { Prefix, Subsystem } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'
import { Event, EventKey, EventName, EventService, ObserveEvent } from '../../src/clients/event'
import { Done } from '../../src/clients/location'

jest.setTimeout(50000)

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await startServices(['Gateway', 'Event'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Event Client', () => {
  test('should publish event | ESW-318', async () => {
    const eventService = new EventService()

    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const observeEvent = new ObserveEvent(
      'event1',
      prefix,
      eventName,
      new Date(2020, 1, 1).toISOString(),
      []
    )
    const done = await eventService.publish(observeEvent)

    const done1: Done = 'Done'
    expect(done).toEqual(done1)
  })

  test('should get event | ESW-318', async () => {
    const eventService = new EventService()

    const prefix = new Prefix('CSW', 'ncc.trombone')
    const eventName = new EventName('offline')
    const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])

    const observeEvent: Event = (await eventService.get(eventKeys))[0]

    expect(observeEvent._type).toEqual('ObserveEvent')
    expect(observeEvent.source).toEqual(prefix)
    expect(observeEvent.eventName).toEqual(eventName)
  })

  test('should subscribe to s published event', () => {
    return new Promise((jestDoneCallback) => {
      const prefix = new Prefix('CSW', 'ncc.trombone')
      const eventName = new EventName('offline')
      const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])

      new EventService().subscribe(eventKeys, 1, (event) => {
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        jestDoneCallback()
      })
    })
  })

  test('should pattern subscribe to s published event', () => {
    return new Promise((jestDoneCallback) => {
      const prefix = new Prefix('CSW', 'ncc.trombone')
      const eventName = new EventName('offline')
      const subsystem: Subsystem = 'ESW'

      new EventService().pSubscribe(subsystem, 1, '*', (event) => {
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        jestDoneCallback()
      })
    })
  })
})
