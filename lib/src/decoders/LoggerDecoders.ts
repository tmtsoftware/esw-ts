import * as D from 'io-ts/lib/Decoder'
import type { LogMetadata } from '../clients/logger'
import type { Level } from './../clients/logger/models/Level'
import { ciLiteral, Decoder } from './Decoder'

export const LevelD: Decoder<Level> = ciLiteral('TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL')

export const LogMetadataD: Decoder<LogMetadata> = D.type({
  defaultLevel: LevelD,
  akkaLevel: LevelD,
  slf4jLevel: LevelD,
  componentLevel: LevelD
})
