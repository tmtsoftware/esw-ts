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

export type Event = ObserveEvent | SystemEvent

interface EventI {
  _type: EventTypes
  eventId: string
  source: Prefix
  eventName: EventName
  eventTime: string
  paramSet: Parameter<Key>[]
}

type EventFactory = new (
  source: Prefix,
  eventName: EventName,
  paramSet: Parameter<Key>[],
  eventId: string,
  eventTime: string
) => Event

const EventD = (_type: EventTypes, apply: EventFactory): Decoder<Event> =>
  pipe(
    D.type({
      _type: ciLiteral(_type),
      eventId: D.string,
      source: PrefixD,
      eventName: EventNameD,
      eventTime: D.string,
      paramSet: D.array(ParameterD)
    }),
    D.parse((eventData: EventI) =>
      D.success(
        new apply(
          eventData.source,
          eventData.eventName,
          eventData.paramSet,
          eventData.eventId,
          eventData.eventTime
        )
      )
    )
  )

export class ObserveEvent extends ParameterSetType<ObserveEvent> {
  readonly _type = ObserveEventL

  constructor(
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly paramSet: Parameter<Key>[],
    readonly eventId: string = uuidv4(),
    readonly eventTime: string = new Date().toISOString()
  ) {
    super(paramSet)
  }

  create(data: Parameter<Key>[]): ObserveEvent {
    return new ObserveEvent(this.source, this.eventName, data)
  }

  static apply(source: Prefix, eventName: EventName, paramSet: Parameter<Key>[]) {
    return new ObserveEvent(source, eventName, paramSet)
  }
}

export class SystemEvent extends ParameterSetType<SystemEvent> {
  readonly _type = SystemEventL

  constructor(
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly paramSet: Parameter<Key>[],
    readonly eventId: string = uuidv4(),
    readonly eventTime: string = new Date().toISOString()
  ) {
    super(paramSet)
  }

  create(data: Parameter<Key>[]): SystemEvent {
    return new SystemEvent(this.source, this.eventName, data)
  }
}

export const Event = D.sum('_type')({
  [ObserveEventL]: EventD(ObserveEventL, ObserveEvent),
  [SystemEventL]: EventD(SystemEventL, SystemEvent)
})
