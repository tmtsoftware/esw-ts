import type * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'

export const LevelD = ciLiteral('TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL')

export type Level = D.TypeOf<typeof LevelD>
