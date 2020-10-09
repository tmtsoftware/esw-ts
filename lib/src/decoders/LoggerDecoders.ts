import * as D from 'io-ts/Decoder'
import type { LogMetadata } from '../clients/logger'
import { ciLiteral, Decoder } from '../utils/Decoder'

export const LevelD = ciLiteral('TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL')

export const LogMetadataD: Decoder<LogMetadata> = D.type({
  defaultLevel: LevelD,
  akkaLevel: LevelD,
  slf4jLevel: LevelD,
  componentLevel: LevelD
})
