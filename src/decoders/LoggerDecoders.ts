import * as D from 'io-ts/es6/Decoder'
import type { Level, LogMetadata } from '../clients/logger'

import { ciLiteral, Decoder } from './Decoder'

export const LevelD: Decoder<Level> = ciLiteral('TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL')

export const LogMetadataD: Decoder<LogMetadata> = D.struct({
  defaultLevel: LevelD,
  akkaLevel: LevelD,
  slf4jLevel: LevelD,
  componentLevel: LevelD
})
