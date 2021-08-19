import type { BooleanKey, ShortKey, UTCTimeKey } from '@tmtsoftware/esw-ts'
import { booleanKey, Parameter, shortKey, utcTimeKey, Units } from '@tmtsoftware/esw-ts'
//#units
//#primitives
//declare keyName
const s1: string = 'encoder'

//making 2 keys
const k1 = booleanKey(s1)
const k2 = shortKey('RandomKeyName', Units.meter)

//storing a single value
const booleanParam: Parameter<BooleanKey> = k1.set([true])

//storing multiple values
const paramWithShorts1: Parameter<ShortKey> = k2.set([1, 2, 3, 4])

//  default unit is NoUnits
// booleanParam.units === "NoUnits"

//retrieve values from Parameter
const allValues: Array<number> = paramWithShorts1.values

// allValues === Array(1, 2, 3, 4))
// paramWithUnits3.units === "meter")

//default unit for UTCTimeKey is utc
const tParam: Parameter<UTCTimeKey> = utcTimeKey('now').set([new Date().toUTCString()])
const defaultTimeUnit: Units = tParam.units //is utc
//#units
