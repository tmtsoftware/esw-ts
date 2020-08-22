import { Subsystem } from '../../../models'
import { EventKey } from './EventKey'

export class Subscribe {
  readonly _type: 'Subscribe' = 'Subscribe'

  constructor(readonly eventKeys: EventKey[], readonly maxFrequency: number) {}
}

export class SubscribeWithPattern {
  readonly _type: 'SubscribeWithPattern' = 'SubscribeWithPattern'

  constructor(
    readonly subsystem: Subsystem,
    readonly maxFrequency: number,
    readonly pattern: string
  ) {}
}
