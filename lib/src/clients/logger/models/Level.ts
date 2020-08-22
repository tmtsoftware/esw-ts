import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'

export const Level = ciLiteral('TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL')

export type Level = D.TypeOf<typeof Level>
