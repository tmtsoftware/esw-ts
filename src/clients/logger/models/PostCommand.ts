/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Level } from './Level'
import type { Prefix } from '../../../models'

export class Log {
  _type: 'Log' = 'Log' as const

  constructor(
    readonly prefix: Prefix,
    readonly level: Level,
    readonly message: string,
    readonly metadata: Record<string, any>
  ) {}
}
