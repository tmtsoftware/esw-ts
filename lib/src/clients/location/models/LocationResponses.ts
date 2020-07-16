import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'

export const Done = ciLiteral('Done')
export type Done = D.TypeOf<typeof Done>
