/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Level } from './Level'

/**
 * Holds metadata information about logging configuration
 * @category Logger Service
 */
export type LogMetadata = {
  defaultLevel: Level
  pekkoLevel: Level
  slf4jLevel: Level
  componentLevel: Level
}
