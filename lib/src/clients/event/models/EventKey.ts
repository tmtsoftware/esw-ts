import type { Prefix } from '../../../models'
import type { EventName } from './EventName'

/**
 * @category Event Service
 */
export class EventKey {
  constructor(readonly source: Prefix, readonly eventName: EventName) {}
}
