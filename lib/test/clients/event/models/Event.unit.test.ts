import { EventName, ObserveEvent, SystemEvent } from '../../../../src/clients/event'
import { intArrayKey, intKey, Key, Parameter, Prefix, stringKey } from '../../../../src/models'

const intParam: Parameter<Key> = intKey('number').set([1, 2, 3])
const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
const intArrayParam = intArrayKey('array_key').set([
  [1, 2],
  [3, 4]
])
const hcdPrefix = new Prefix('IRIS', 'testHcd')

describe('ObserveEvent', () => {
  test('create | ESW-380', () => {
    const observeEvent = ObserveEvent.make(hcdPrefix, new EventName('Event-1'), [intParam])

    const expected = {
      _type: 'ObserveEvent',
      source: hcdPrefix,
      eventName: new EventName('Event-1'),
      paramSet: [stringParam, intArrayParam],
      eventId: observeEvent.eventId,
      eventTime: observeEvent.eventTime
    }

    const newObserveEvent: ObserveEvent = observeEvent.create([stringParam, intArrayParam])
    expect(newObserveEvent).toEqual(expected)
  })
})

describe('SystemEvent', () => {
  test('create | ESW-380', () => {
    const systemEvent = SystemEvent.make(hcdPrefix, new EventName('Event-1'), [intParam])

    const expected = {
      _type: 'SystemEvent',
      source: hcdPrefix,
      eventName: new EventName('Event-1'),
      paramSet: [intParam, stringParam, intArrayParam],
      eventId: systemEvent.eventId,
      eventTime: systemEvent.eventTime
    }

    const newSystemEvent: SystemEvent = systemEvent.create([intParam, stringParam, intArrayParam])
    expect(newSystemEvent).toEqual(expected)
  })
})
