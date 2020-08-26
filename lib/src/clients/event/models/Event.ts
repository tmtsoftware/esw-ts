import * as D from 'io-ts/lib/Decoder'
import { v4 as uuidv4 } from 'uuid'
import { Key, Parameter, ParameterD, Prefix, PrefixD } from '../../../models'
import { ciLiteral, Decoder } from '../../../utils/Decoder'
import { EventName, EventNameD } from './EventName'

// ##################### Decoders #####################
const mkEventD = (_type: EventTypes): Decoder<Event> =>
  D.type({
    _type: ciLiteral(_type),
    eventId: D.string,
    source: PrefixD,
    eventName: EventNameD,
    eventTime: D.string,
    paramSet: D.array(ParameterD)
  })

const ObserveEventL = 'ObserveEvent'
const SystemEventL = 'SystemEvent'
type EventTypes = typeof ObserveEventL | typeof SystemEventL

export const EventD = D.sum('_type')({
  [ObserveEventL]: mkEventD(ObserveEventL),
  [SystemEventL]: mkEventD(SystemEventL)
})

// ######################################################

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

export type Event = ObserveEvent | SystemEvent
