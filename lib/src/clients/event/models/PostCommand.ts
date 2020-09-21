import type { Event } from './Event'
import type { EventKey } from './EventKey'

export class PublishEvent {
  readonly _type: 'PublishEvent' = 'PublishEvent'

  constructor(readonly event: Event) {}
}

export class GetEvent {
  readonly _type: 'GetEvent' = 'GetEvent'

  constructor(readonly eventKeys: EventKey[]) {}
}
