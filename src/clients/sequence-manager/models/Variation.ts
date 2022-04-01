/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @category Sequence Manager Service
 */
export class Variation {
  constructor(readonly name: string) {}

  toJSON(): string {
    return this.name
  }
}
