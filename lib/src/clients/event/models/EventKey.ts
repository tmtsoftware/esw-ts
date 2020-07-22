import { Prefix, PrefixD } from '../../../models'
import { EventName, EventNameD } from './EventName'
import { Decoder } from '../../../utils/Decoder'
import * as D from 'io-ts/lib/Decoder'

export class EventKey {
  constructor(readonly source: Prefix, readonly eventName: EventName) {}
}

export const EventKeyD: Decoder<EventKey> = D.type({
  source: PrefixD,
  eventName: EventNameD
})
