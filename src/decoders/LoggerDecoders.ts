/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import * as D from 'io-ts/lib/Decoder'
import { ciLiteral, Decoder } from './Decoder'
import type { Level, LogMetadata } from '../clients/logger'

export const LevelD: Decoder<Level> = ciLiteral('TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL')

export const LogMetadataD: Decoder<LogMetadata> = D.struct({
  defaultLevel: LevelD,
  pekkoLevel: LevelD,
  slf4jLevel: LevelD,
  componentLevel: LevelD
})
