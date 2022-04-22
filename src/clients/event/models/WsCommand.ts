/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Subsystem } from '../../../models'
import type { EventKey } from './EventKey'

export class Subscribe {
  readonly _type: 'Subscribe' = 'Subscribe'

  constructor(readonly eventKeys: EventKey[], readonly maxFrequency?: number) {}

  toJSON() {
    return this.maxFrequency
      ? { _type: this._type, eventKeys: this.eventKeys, maxFrequency: this.maxFrequency }
      : { _type: this._type, eventKeys: this.eventKeys }
  }
}

export class SubscribeWithPattern {
  readonly _type: 'SubscribeWithPattern' = 'SubscribeWithPattern'

  constructor(readonly subsystem: Subsystem, readonly pattern: string, readonly maxFrequency?: number) {}

  toJSON() {
    return this.maxFrequency
      ? { _type: this._type, subsystem: this.subsystem, pattern: this.pattern, maxFrequency: this.maxFrequency }
      : { _type: this._type, subsystem: this.subsystem, pattern: this.pattern }
  }
}

export class SubscribeObserveEvents {
  readonly _type: 'SubscribeObserveEvents' = 'SubscribeObserveEvents'

  constructor(readonly maxFrequency?: number) {}

  toJSON() {
    return this.maxFrequency ? { _type: this._type, maxFrequency: this.maxFrequency } : { _type: this._type }
  }
}
