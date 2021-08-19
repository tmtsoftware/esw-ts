import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/lib/Decoder'
import { Units } from '../models/params/Units'
import { ciLiteral, Decoder } from './Decoder'

const unitsKeys = Object.keys(Units.values)
const UnitsKeyD = ciLiteral(unitsKeys[0], ...unitsKeys.slice(1))

export const UnitsD: Decoder<Units> = pipe(
  UnitsKeyD,
  D.parse((str) => {
    return D.success(Units.values[str])
  })
)
