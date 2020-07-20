import * as D from 'io-ts/lib/Decoder'
import {ciLiteral, Decoder} from "../../../utils/Decoder";
import {Parameter, ParameterD, Prefix, PrefixD} from "../../../models";
import {EventName, EventNameD} from "./EventName";
import {Key} from "../../../models";

const ObserveEventL = 'ObserveEvent'
const SystemEventL = 'SystemEvent'

export interface EventD<L> {
  readonly _type: L
  readonly eventId: string,
  readonly source: Prefix,
  readonly eventName: EventName,
  readonly eventTime: string,
  readonly paramSet: Parameter<Key>[]

}

export const Event = <L extends string>(_type: L): Decoder<EventD<L>> =>
  D.type({
    _type: ciLiteral(_type),
    eventId: D.string,
    source: PrefixD,
    eventName: EventNameD,
    eventTime: D.string,
    paramSet: D.array(ParameterD)
  })

export class ObserveEvent implements EventD<typeof ObserveEventL> {
  readonly _type = ObserveEventL

  constructor(
    readonly eventId: string,
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly eventTime: string,
    readonly paramSet: Parameter<Key>[]) {
  }
}

export class SystemEvent implements EventD<typeof SystemEventL> {
  readonly _type = SystemEventL

  constructor(
    readonly eventId: string,
    readonly source: Prefix,
    readonly eventName: EventName,
    readonly eventTime: string,
    readonly paramSet: Parameter<Key>[]) {
  }
}

export type Event = ObserveEvent | SystemEvent
