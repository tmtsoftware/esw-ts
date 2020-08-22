import * as D from 'io-ts/lib/Decoder'
import { v4 as uuidv4 } from 'uuid'
import { ciLiteral, Decoder } from '../../../utils/Decoder'
import { Key, Parameter, ParameterD, Prefix, PrefixD } from '../../../models'
import { EventName, EventNameD } from './EventName'

const ObserveEventL = 'ObserveEvent'
const SystemEventL = 'SystemEvent'

type EventTypes = typeof ObserveEventL | typeof SystemEventL

export type Event = ObserveEvent | SystemEvent

const EventD = (_type: EventTypes): Decoder<Event> =>
  D.type({
    _type: ciLiteral(_type),
    eventId: D.string,
    source: PrefixD,
    eventName: EventNameD,
    eventTime: D.string,
    paramSet: D.array(ParameterD)
  })

export class ObserveEvent {
  readonly _type = ObserveEventL
  readonly eventId: string = uuidv4()
  readonly eventTime: string = new Date().toISOString()

  constructor(
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly paramSet: Parameter<Key>[]
  ) {}
}

export class SystemEvent {
  readonly _type = SystemEventL
  readonly eventId: string = uuidv4()
  readonly eventTime: string = new Date().toISOString()

  constructor(
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly paramSet: Parameter<Key>[]
  ) {}
}

export const Event = D.sum('_type')({
  [ObserveEventL]: EventD(ObserveEventL),
  [SystemEventL]: EventD(SystemEventL)
})
