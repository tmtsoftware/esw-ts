import type { Prefix } from '../../../models'
import type { EventName } from './EventName'

export class EventKey {
  constructor(readonly source: Prefix, readonly eventName: EventName) {}
}
