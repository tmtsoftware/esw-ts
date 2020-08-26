import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'
import { LocationD } from './Location'

export const DoneD = ciLiteral('Done')
export const LocationListD = D.array(LocationD)

export type Done = D.TypeOf<typeof DoneD>
