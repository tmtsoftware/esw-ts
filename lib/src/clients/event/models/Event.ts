import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import { v4 as uuidv4 } from 'uuid'
import { Key, Parameter, ParameterD, Prefix, PrefixD } from '../../../models'
import { ParameterSetType } from '../../../models/params/ParameterSetType'
import { ciLiteral, Decoder } from '../../../utils/Decoder'
import { EventName, EventNameD } from './EventName'

const ObserveEventL = 'ObserveEvent'
const SystemEventL = 'SystemEvent'
type EventTypes = typeof ObserveEventL | typeof SystemEventL

interface EventI {
  _type: EventTypes
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

  static apply(source: Prefix, eventName: EventName, paramSet: Parameter<Key>[]) {
    return new ObserveEvent(source, eventName, paramSet)
  }

  static decode(data: EventI): ObserveEvent {
    return new ObserveEvent(
      data.source,
      data.eventName,
      data.paramSet,
      data.eventId,
      data.eventTime
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

  static apply(source: Prefix, eventName: EventName, paramSet: Parameter<Key>[]) {
    return new SystemEvent(source, eventName, paramSet)
  }

  static decode(data: EventI): SystemEvent {
    return new SystemEvent(data.source, data.eventName, data.paramSet, data.eventId, data.eventTime)
  }
}

export type Event = ObserveEvent | SystemEvent

// ##################### Decoders #####################

type EventFactory = (data: EventI) => Event

const mkEventD = (_type: EventTypes, apply: EventFactory): Decoder<Event> =>
  pipe(
    D.type({
      _type: ciLiteral(_type),
      eventId: D.string,
      source: PrefixD,
      eventName: EventNameD,
      eventTime: D.string,
      paramSet: D.array(ParameterD)
    }),
    D.parse((eventData) => D.success(apply(eventData)))
  )

export const EventD = D.sum('_type')({
  [ObserveEventL]: mkEventD(ObserveEventL, ObserveEvent.decode),
  [SystemEventL]: mkEventD(SystemEventL, SystemEvent.decode)
})

// ######################################################
