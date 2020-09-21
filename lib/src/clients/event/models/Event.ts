import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import { v4 as uuidv4 } from 'uuid'
import { Key, Parameter, ParameterD, Prefix, PrefixD } from '../../../models'
import { ParameterSetType } from '../../../models/params/ParameterSetType'
import { ciLiteral, Decoder } from '../../../utils/Decoder'
import { EventName, EventNameD } from './EventName'

const ObserveEventL = 'ObserveEvent'
const SystemEventL = 'SystemEvent'
type EventType = typeof ObserveEventL | typeof SystemEventL

interface EventI {
  _type: EventType
  eventId: string
  source: Prefix
  eventName: EventName
  eventTime: string
  paramSet: Parameter<Key>[]
}

export class ObserveEvent extends ParameterSetType<ObserveEvent> {
  readonly _type = ObserveEventL

  private constructor(
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly paramSet: Parameter<Key>[] = [],
    readonly eventId: string = uuidv4(),
    readonly eventTime: string = new Date().toISOString()
  ) {
    super()
  }

  create(data: Parameter<Key>[]): ObserveEvent {
    return new ObserveEvent(this.source, this.eventName, data, this.eventId, this.eventTime)
  }

  static make(source: Prefix, eventName: EventName, paramSet: Parameter<Key>[]) {
    return new ObserveEvent(source, eventName, paramSet)
  }

  static decoder(): Decoder<ObserveEvent> {
    return mkEventD(
      ObserveEventL,
      (e) => new ObserveEvent(e.source, e.eventName, e.paramSet, e.eventId, e.eventTime)
    )
  }
}

export class SystemEvent extends ParameterSetType<SystemEvent> {
  readonly _type = SystemEventL

  private constructor(
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly paramSet: Parameter<Key>[] = [],
    readonly eventId: string = uuidv4(),
    readonly eventTime: string = new Date().toISOString()
  ) {
    super()
  }

  create(data: Parameter<Key>[]): SystemEvent {
    return new SystemEvent(this.source, this.eventName, data, this.eventId, this.eventTime)
  }

  static make(source: Prefix, eventName: EventName, paramSet: Parameter<Key>[]) {
    return new SystemEvent(source, eventName, paramSet)
  }

  static decoder(): Decoder<SystemEvent> {
    return mkEventD(
      SystemEventL,
      (e) => new SystemEvent(e.source, e.eventName, e.paramSet, e.eventId, e.eventTime)
    )
  }
}

export type Event = ObserveEvent | SystemEvent

// ##################### Decoders #####################

const mkEventD = <T extends Event>(_type: EventType, factory: (e: EventI) => T) =>
  pipe(
    D.type({
      _type: ciLiteral(_type),
      eventId: D.string,
      source: PrefixD,
      eventName: EventNameD,
      eventTime: D.string,
      paramSet: D.array(ParameterD)
    }),
    D.parse((e) => D.success(factory(e)))
  )

export const EventD: Decoder<Event> = D.sum('_type')({
  [ObserveEventL]: ObserveEvent.decoder(),
  [SystemEventL]: SystemEvent.decoder()
})

// ######################################################
