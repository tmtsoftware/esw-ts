import * as D from 'io-ts/lib/Decoder'
import { ciLiteral, Decoder } from '../../../utils/Decoder'
import { Parameter, ParameterD, Prefix, PrefixD, Key } from '../../../models'
import { EventName, EventNameD } from './EventName'

const ObserveEventL = 'ObserveEvent'
const SystemEventL = 'SystemEvent'

interface EventI<L> {
  readonly _type: L
  readonly eventId: string
  readonly source: Prefix
  readonly eventName: EventName
  readonly eventTime: string
  readonly paramSet: Parameter<Key>[]
}

export const EventD = <L extends string>(_type: L): Decoder<EventI<L>> =>
  D.type({
    _type: ciLiteral(_type),
    eventId: D.string,
    source: PrefixD,
    eventName: EventNameD,
    eventTime: D.string,
    paramSet: D.array(ParameterD)
  })

export class ObserveEvent implements EventI<typeof ObserveEventL> {
  readonly _type = ObserveEventL

  constructor(
    readonly eventId: string,
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly eventTime: string,
    readonly paramSet: Parameter<Key>[]
  ) {}
}

export class SystemEvent implements EventI<typeof SystemEventL> {
  readonly _type = SystemEventL

  constructor(
    readonly eventId: string,
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly eventTime: string,
    readonly paramSet: Parameter<Key>[]
  ) {}
}

export type Event = D.TypeOf<typeof Event>

export const Event = D.sum('_type')({
  [ObserveEventL]: EventD(ObserveEventL),
  [SystemEventL]: EventD(SystemEventL)
})
