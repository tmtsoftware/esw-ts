import * as D from 'io-ts/lib/Decoder'
import type { Prefix } from '../../../models'
import { PrefixD } from '../../../models/params/Prefix'
import type { Decoder } from '../../../utils/Decoder'
import { EventName, EventNameD } from './EventName'

export class EventKey {
  constructor(readonly source: Prefix, readonly eventName: EventName) {}
}

export const EventKeyD: Decoder<EventKey> = D.type({
  source: PrefixD,
  eventName: EventNameD
})
