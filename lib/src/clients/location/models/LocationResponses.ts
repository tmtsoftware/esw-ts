import type * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'

export const DoneD = ciLiteral('Done')

export type Done = D.TypeOf<typeof DoneD>
