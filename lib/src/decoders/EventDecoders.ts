import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { EventKey, EventName, Key, Parameter } from '..'
import { Event, ObserveEvent, SystemEvent } from '../clients/event/models/Event'
import { ParameterD } from '../models/params/Parameter'
import type { Prefix } from '../models/params/Prefix'
import { ciLiteral, Decoder } from '../utils/Decoder'
import { PrefixD } from './PrefixDecoder'

export const EventNameD: Decoder<EventName> = pipe(
  D.string,
  D.parse((name) => D.success(new EventName(name)))
)

export const EventKeyD: Decoder<EventKey> = D.type({
  source: PrefixD,
  eventName: EventNameD
})

interface BaseEvent {
  eventId: string
  source: Prefix
  eventName: EventName
  eventTime: string
  paramSet: Parameter<Key>[]
}

export const mkEventD = <T extends Event>(_type: T['_type'], factory: (e: BaseEvent) => T) =>
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
  ObserveEvent: ObserveEvent.decoder(),
  SystemEvent: SystemEvent.decoder()
})
