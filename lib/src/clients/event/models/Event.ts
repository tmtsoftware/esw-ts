import { v4 as uuidv4 } from 'uuid'
import type { Decoder } from '../../../decoders/Decoder'
import { mkEventD } from '../../../decoders/EventDecoders'
import type { Key, Parameter, Prefix } from '../../../models'
import { ParameterSetType } from '../../../models/params/ParameterSetType'
import type { EventName } from './EventName'

/**
 * @category Event Service
 */
export class ObserveEvent extends ParameterSetType<ObserveEvent> {
  readonly _type = 'ObserveEvent'

  private constructor(
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly paramSet: Parameter<Key>[],
    readonly eventId: string = uuidv4(),
    readonly eventTime: string = new Date().toISOString()
  ) {
    super()
  }

  create(data: Parameter<Key>[]): ObserveEvent {
    return new ObserveEvent(this.source, this.eventName, data, this.eventId, this.eventTime)
  }

  static make(source: Prefix, eventName: EventName, paramSet: Parameter<Key>[] = []) {
    return new ObserveEvent(source, eventName, paramSet)
  }

  static decoder(): Decoder<ObserveEvent> {
    return mkEventD(
      'ObserveEvent',
      (e) => new ObserveEvent(e.source, e.eventName, e.paramSet, e.eventId, e.eventTime)
    )
  }
}

/**
 * @category Event Service
 */
export class SystemEvent extends ParameterSetType<SystemEvent> {
  readonly _type = 'SystemEvent'

  private constructor(
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly paramSet: Parameter<Key>[],
    readonly eventId: string = uuidv4(),
    readonly eventTime: string = new Date().toISOString()
  ) {
    super()
  }

  create(data: Parameter<Key>[]): SystemEvent {
    return new SystemEvent(this.source, this.eventName, data, this.eventId, this.eventTime)
  }

  static make(source: Prefix, eventName: EventName, paramSet: Parameter<Key>[] = []) {
    return new SystemEvent(source, eventName, paramSet)
  }

  static decoder(): Decoder<SystemEvent> {
    return mkEventD(
      'SystemEvent',
      (e) => new SystemEvent(e.source, e.eventName, e.paramSet, e.eventId, e.eventTime)
    )
  }
}

/**
 * @category Event Service
 */
export type Event = ObserveEvent | SystemEvent
