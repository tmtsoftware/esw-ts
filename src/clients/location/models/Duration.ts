/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

export class Duration {
  constructor(readonly value: number, readonly unit: TimeUnit) {}

  toJSON() {
    return `${this.value} ${this.unit}`
  }
}

export type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds' | 'microseconds' | 'nanoseconds'
