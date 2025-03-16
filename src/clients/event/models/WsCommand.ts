/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { EventKey } from './EventKey'
import type { Subsystem } from '../../../models'

export class Subscribe {
  _type: 'Subscribe' = 'Subscribe' as const

  constructor(
    readonly eventKeys: EventKey[],
    readonly maxFrequency?: number
  ) {}

  toJSON() {
    return this.maxFrequency
      ? { _type: this._type, eventKeys: this.eventKeys, maxFrequency: this.maxFrequency }
      : { _type: this._type, eventKeys: this.eventKeys }
  }
}

export class SubscribeWithPattern {
  _type: 'SubscribeWithPattern' = 'SubscribeWithPattern' as const

  constructor(
    readonly subsystem: Subsystem,
    readonly pattern: string,
    readonly maxFrequency?: number
  ) {}

  toJSON() {
    return this.maxFrequency
      ? { _type: this._type, subsystem: this.subsystem, pattern: this.pattern, maxFrequency: this.maxFrequency }
      : { _type: this._type, subsystem: this.subsystem, pattern: this.pattern }
  }
}

export class SubscribeObserveEvents {
  _type: 'SubscribeObserveEvents' = 'SubscribeObserveEvents' as const

  constructor(readonly maxFrequency?: number) {}

  toJSON() {
    return this.maxFrequency ? { _type: this._type, maxFrequency: this.maxFrequency } : { _type: this._type }
  }
}
