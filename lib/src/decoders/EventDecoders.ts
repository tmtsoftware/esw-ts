import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import type { EventKey } from '../clients/event'
import { Event, EventName, ObserveEvent, SystemEvent } from '../clients/event'
import type { Key, Parameter, Prefix } from '../models'
import { ciLiteral, Decoder } from './Decoder'
import { ParameterD } from './ParameterDecoder'
import { PrefixD } from './PrefixDecoder'

export const EventNameD: Decoder<EventName> = pipe(
  D.string,
  D.parse((name) => D.success(new EventName(name)))
)

export const EventKeyD: Decoder<EventKey> = D.struct({
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
    D.struct({
      _type: ciLiteral(_type),
      eventId: D.string,
      source: PrefixD,
      eventName: EventNameD,
      eventTime: D.string,
      paramSet: D.array(ParameterD)
    }),
    D.parse((e) => D.success(factory(e)))
  )

export const EventD: Decoder<Event> = D.lazy('Decoder<Event>', () =>
  D.sum('_type')({
    ObserveEvent: ObserveEvent.decoder(),
    SystemEvent: SystemEvent.decoder()
  })
)

export const EventsD: Decoder<Event[]> = D.array(EventD)
