import { Units } from '../models/params/Units'
import { ciLiteral, Decoder } from './Decoder'

const unitsKeys = Object.keys(Units) as Units[]
export const UnitsD: Decoder<Units> = ciLiteral(unitsKeys[0], ...unitsKeys.slice(1))
