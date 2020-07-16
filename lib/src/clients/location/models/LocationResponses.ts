import * as D from 'io-ts/lib/Decoder'
import { CaseInsensitiveLiteral } from '../../../utils/Decoder'

export const Done = CaseInsensitiveLiteral('Done')
export type Done = D.TypeOf<typeof Done>
