import { Event, EventName, SystemEvent } from '../../src/clients/event'
import { BaseKey, Key, Parameter, Prefix } from '../../src/models'
import { getOrThrow } from '../../src/utils/Utils'

const prefix = new Prefix('ESW', 'ncc.trombone1')
test('System event', () => {
  const eventName = new EventName('offline')

  const key: BaseKey<Key> = new BaseKey('prime numbers', 'IntKey', 'NoUnits')

  const keyParameter: Parameter<Key> = key.set([1, 2, 3])

  console.log(keyParameter.constructor.name)
  const systemEvent = new SystemEvent(prefix, eventName, [keyParameter])

  console.log(systemEvent.get(key))
})

test('jslkj', () => {
  const eventName = new EventName('offline')

  const key: BaseKey<Key> = new BaseKey('prime numbers', 'IntKey', 'NoUnits')
  const key1: BaseKey<Key> = new BaseKey('prime numbers', 'IntKey', 'NoUnits')

  const keyParameter: Parameter<Key> = key.set([1, 2, 3])
  const keyParameter1: Parameter<Key> = key1.set([1, 2, 3])

  const systemEvent = new SystemEvent(prefix, eventName, [keyParameter])

  console.log(systemEvent)
  console.log(systemEvent.remove(key1))

  console.log(new Set([keyParameter]).add(keyParameter1))
})

test('parse event', () => {
  const a = {
    _type: 'ObserveEvent',
    eventId: '7ae9cf4b-2f26-47e5-ad89-52525b45bd91',
    source: 'CSW.ncc.trombone',
    eventName: 'offline',
    eventTime: '2020-05-13T07:05:26.288847Z',
    paramSet: [
      {
        IntKey: {
          keyName: 'prime numbers',
          values: [1, 2, 3],
          units: 'NoUnits'
        }
      }
    ]
  }

  const event = getOrThrow(Event.decode(a))
  const key: BaseKey<Key> = new BaseKey('prim numbers', 'IntKey', 'NoUnits')

  console.log(event.get(key))
})
