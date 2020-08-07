import 'whatwg-fetch'
import { Prefix, Subsystem } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'
import {
  Event,
  EventKey,
  EventName,
  EventService,
  EventServiceFactory,
  ObserveEvent
} from '../../src/clients/event'
import { Done } from '../../src/clients/location'

jest.setTimeout(50000)
let eventService: EventService

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await startServices(['Gateway'])
  eventService = await EventServiceFactory.make()
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Event Client', () => {
  test('should publish and get event | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'ncc.trombone1')
    const eventName = new EventName('offline')
    const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
    const eventId = 'eventId1'
    const observeEvent = new ObserveEvent(
      eventId,
      prefix,
      eventName,
      new Date(2020, 1, 1, 1, 1, 30, 12).toISOString(),
      []
    )
    const done = await eventService.publish(observeEvent)

    const expected: Done = 'Done'
    expect(done).toEqual(expected)

    const event: Event = (await eventService.get(eventKeys))[0]
    expect(event).toEqual(observeEvent)
  })

  test('should publish and subscribe to published event | ESW-318', () => {
    return new Promise(async (jestDoneCallback) => {
      const prefix = new Prefix('ESW', 'ncc.trombone2')
      const eventName = new EventName('offline')
      const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
      const eventId = 'event2'
      const observeEvent = new ObserveEvent(
        eventId,
        prefix,
        eventName,
        new Date(2020, 1, 1).toISOString(),
        []
      )

      const callback = (event: Event) => {
        expect(event.eventId).toEqual(eventId)
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        subscription.cancel()
        jestDoneCallback()
      }

      const subscription = await eventService.subscribe(eventKeys, 1)(callback)
      await eventService.publish(observeEvent)
    })
  })

  test('should publish and pattern subscribe to published event | ESW-318', () => {
    return new Promise(async (jestDoneCallback) => {
      const prefix = new Prefix('CSW', 'ncc.trombone')
      const eventName = new EventName('offline')
      const subsystem: Subsystem = 'CSW'
      const eventId = 'event3'
      const observeEvent = new ObserveEvent(
        eventId,
        prefix,
        eventName,
        new Date(2020, 1, 1).toISOString(),
        []
      )

      const callback = (event: Event) => {
        expect(event.eventId).toEqual(eventId)
        expect(event._type).toEqual('ObserveEvent')
        expect(event.source).toEqual(prefix)
        expect(event.eventName).toEqual(eventName)
        subscription.cancel()
        jestDoneCallback()
      }

      const subscription = await eventService.pSubscribe(subsystem, 1, '.*')(callback)
      await eventService.publish(observeEvent)
    })
  })
})
