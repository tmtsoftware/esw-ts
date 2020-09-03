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
    const observeEvent = new ObserveEvent(hcdPrefix, new EventName('Event-1'), [intParam])

    const expected = new ObserveEvent(
      hcdPrefix,
      new EventName('Event-1'),
      [stringParam, intArrayParam],
      observeEvent.eventId,
      observeEvent.eventTime
    )

    expect(observeEvent.create([stringParam, intArrayParam])).toEqual(expected)
  })
})

describe('SystemEvent', () => {
  test('create | ESW-380', () => {
    const systemEvent = new SystemEvent(hcdPrefix, new EventName('Event-1'), [intParam])

    const expected = new SystemEvent(
      hcdPrefix,
      new EventName('Event-1'),
      [intParam, stringParam, intArrayParam],
      systemEvent.eventId,
      systemEvent.eventTime
    )

    expect(systemEvent.create([intParam, stringParam, intArrayParam])).toEqual(expected)
  })
})
