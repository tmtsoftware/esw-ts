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
  test('get | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const observeEvent = new ObserveEvent(hcdPrefix, new EventName('Event-1')).madd(paramSet)

    expect(observeEvent.get(intKey('number'))).toEqual(intParam)
  })

  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const observeEvent = new ObserveEvent(hcdPrefix, new EventName('Event-1')).madd(paramSet)

    expect(observeEvent.size()).toEqual(2)
  })

  test('add | ESW-380', () => {
    const observeEvent = new ObserveEvent(hcdPrefix, new EventName('Event-1'), [intParam])
    const expected = new ObserveEvent(
      hcdPrefix,
      new EventName('Event-1'),
      [intParam, stringParam],
      observeEvent.eventId,
      observeEvent.eventTime
    )

    expect(observeEvent.add(stringParam)).toEqual(expected)
  })

  test('madd | ESW-380', () => {
    const observeEvent = new ObserveEvent(hcdPrefix, new EventName('Event-1'), [intParam])

    const expected = new ObserveEvent(
      hcdPrefix,
      new EventName('Event-1'),
      [intParam, stringParam, intArrayParam],
      observeEvent.eventId,
      observeEvent.eventTime
    )

    expect(observeEvent.madd([stringParam, intArrayParam])).toEqual(expected)
  })

  test('exists | ESW-380', () => {
    const observeEvent = new ObserveEvent(hcdPrefix, new EventName('Event-1')).madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    expect(observeEvent.exists(intKey('number'))).toBe(true)
    expect(observeEvent.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const observeEvent = new ObserveEvent(hcdPrefix, new EventName('Event-1')).madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    const expected = new ObserveEvent(
      hcdPrefix,
      new EventName('Event-1'),
      [stringParam, intArrayParam],
      observeEvent.eventId,
      observeEvent.eventTime
    )

    expect(observeEvent.remove(intKey('number'))).toEqual(expected)
  })
})

describe('SystemEvent', () => {
  test('get | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const systemEvent = new SystemEvent(hcdPrefix, new EventName('Event-1')).madd(paramSet)

    expect(systemEvent.get(intKey('number'))).toEqual(intParam)
  })

  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const systemEvent = new SystemEvent(hcdPrefix, new EventName('Event-1')).madd(paramSet)

    expect(systemEvent.size()).toEqual(2)
  })

  test('add | ESW-380', () => {
    const systemEvent = new SystemEvent(hcdPrefix, new EventName('Event-1'), [intParam])
    const expected = new SystemEvent(
      hcdPrefix,
      new EventName('Event-1'),
      [intParam, stringParam],
      systemEvent.eventId,
      systemEvent.eventTime
    )

    expect(systemEvent.add(stringParam)).toEqual(expected)
  })

  test('madd | ESW-380', () => {
    const systemEvent = new SystemEvent(hcdPrefix, new EventName('Event-1'), [intParam])

    const expected = new SystemEvent(
      hcdPrefix,
      new EventName('Event-1'),
      [intParam, stringParam, intArrayParam],
      systemEvent.eventId,
      systemEvent.eventTime
    )

    expect(systemEvent.madd([stringParam, intArrayParam])).toEqual(expected)
  })

  test('exists | ESW-380', () => {
    const systemEvent = new SystemEvent(hcdPrefix, new EventName('Event-1')).madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    expect(systemEvent.exists(intKey('number'))).toBe(true)
    expect(systemEvent.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const systemEvent = new SystemEvent(hcdPrefix, new EventName('Event-1')).madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    const expected = new SystemEvent(
      hcdPrefix,
      new EventName('Event-1'),
      [stringParam, intArrayParam],
      systemEvent.eventId,
      systemEvent.eventTime
    )

    expect(systemEvent.remove(intKey('number'))).toEqual(expected)
  })
})
