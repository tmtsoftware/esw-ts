import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'
import { Location } from './Location'

export const Done = ciLiteral('Done')
export type Done = D.TypeOf<typeof Done>

export const LocationList = D.array(Location)
