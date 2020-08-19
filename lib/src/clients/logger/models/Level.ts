import { ciLiteral } from '../../../utils/Decoder'
import * as D from 'io-ts/lib/Decoder'

export const Level = ciLiteral('TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL')

export type Level = D.TypeOf<typeof Level>
