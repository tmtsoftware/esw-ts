/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @category Event Service
 */
export class EventName {
  constructor(readonly name: string) {}

  toJSON() {
    return this.name
  }
}
