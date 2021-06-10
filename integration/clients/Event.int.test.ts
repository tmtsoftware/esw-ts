import 'whatwg-fetch'
import {
  Event,
  EventKey,
  EventName,
  EventService,
  ObserveEvent,
  SystemEvent
} from '../../src/clients/event'
import { setAppConfigPath } from '../../src/config'
import { APP_CONFIG_PATH } from '../../src/config/AppConfigPath'
import { Done, Prefix, Subsystem } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(30000)

let eventService: EventService

const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  setAppConfigPath('../../test/assets/appconfig/AppConfig.ts')
  await startServices(['Gateway'])
  eventService = await EventService()
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
  setAppConfigPath(OLD_APP_CONFIG_PATH)
})

describe('Event Client', () => {
  test('should publish and get event | ESW-318', async () => {
    const prefix = new Prefix('ESW', 'ncc.trombone1')
    const eventName = new EventName('offline')
    const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
    const systemEvent = SystemEvent.make(prefix, eventName, [])
    const done = await eventService.publish(systemEvent)

    const expected: Done = 'Done'
    expect(done).toEqual(expected)

    const event: Event = (await eventService.get(eventKeys))[0]
    expect(event).toEqual(systemEvent)
  })

  test('should publish and subscribe to published event | ESW-318', () => {
    return new Promise<void>(async (jestDoneCallback) => {
      const prefix = new Prefix('ESW', 'ncc.trombone2')
      const eventName = new EventName('offline')
      const eventKeys = new Set<EventKey>([new EventKey(prefix, eventName)])
      const observeEvent = ObserveEvent.make(prefix, eventName, [])
      expect.assertions(1)

      const callback = (event: Event) => {
        expect(event).toEqual(observeEvent)
        subscription.cancel()
        jestDoneCallback()
      }

      const subscription = await eventService.subscribe(eventKeys, 1)(callback)
      await eventService.publish(observeEvent)
    })
  })

  test('should publish and pattern subscribe to published event | ESW-318', () => {
    return new Promise<void>(async (jestDoneCallback) => {
      const prefix = new Prefix('CSW', 'ncc.trombone')
      const eventName = new EventName('offline')
      const subsystem: Subsystem = 'CSW'
      const observeEvent = ObserveEvent.make(prefix, eventName, [])
      expect.assertions(1)

      const callback = (event: Event) => {
        expect(event).toEqual(observeEvent)
        subscription.cancel()
        jestDoneCallback()
      }

      const subscription = await eventService.pSubscribe(subsystem, 1, '.*')(callback)
      await eventService.publish(observeEvent)
    })
  })
})
