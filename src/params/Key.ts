import { Units } from './Units'
import { BaseKey } from './BaseKey'
import { ChoiceKeyFactory } from './ChoiceKeyFactory'
import { Parameter } from './Parameter'
import {
  AltAzCoord,
  CometCoord,
  Coord,
  EqCoord,
  MinorPlanetCoord,
  RaDec,
  SolarSystemCoord,
} from './Coord'
import { MatrixData } from './MatrixData'

export interface Struct {
  paramSet: Parameter<Key>[]
}

type MatrixDataNumberType<KTag> = {
  KeyTag: KTag
  KeyType: MatrixData<number>
}

type ArrayNumberType<KTag> = {
  KeyTag: KTag
  KeyType: number[]
}

type NumberType<KTag> = {
  KeyTag: KTag
  KeyType: number
}
type StringType<KTag> = {
  KeyTag: KTag
  KeyType: string
}

export type KeyType<T extends Key> = T['KeyType']

export type KeyTag<T extends Key> = T['KeyTag']

export type Key =
  | IntKey
  | LongKey
  | ShortKey
  | FloatKey
  | DoubleKey
  | ByteKey
  | StringKey
  | CharKey
  | StructKey
  | ChoiceKey<any>
  | TimeKey
  | RaDecKey
  | EqCoordKey
  | SolarSystemCoordKey
  | MinorPlanetCoordKey
  | CometCoordKey
  | AltAzCoordKey
  | CoordKey
  | IntMatrixKey
  | ByteMatrixKey
  | LongMatrixKey
  | ShortMatrixKey
  | FloatMatrixKey
  | DoubleMatrixKey
  | IntArrayKey
  | ByteArrayKey
  | LongArrayKey
  | ShortArrayKey
  | FloatArrayKey
  | DoubleArrayKey
  | BooleanKey

export type TimeTag = 'UTCTimeKey' | 'TAITimeKey'
// Keys
export type IntKey = NumberType<'IntKey'>
export type LongKey = NumberType<'LongKey'>
export type ShortKey = NumberType<'ShortKey'>
export type FloatKey = NumberType<'FloatKey'>
export type DoubleKey = NumberType<'DoubleKey'>
export type ByteKey = NumberType<'ByteKey'>

export type StringKey = StringType<'StringKey'>
export type CharKey = StringType<'CharKey'>
export type TimeKey = StringType<TimeTag>

export type ByteMatrixKey = MatrixDataNumberType<'ByteMatrixKey'>
export type IntMatrixKey = MatrixDataNumberType<'IntMatrixKey'>
export type LongMatrixKey = MatrixDataNumberType<'LongMatrixKey'>
export type ShortMatrixKey = MatrixDataNumberType<'ShortMatrixKey'>
export type FloatMatrixKey = MatrixDataNumberType<'FloatMatrixKey'>
export type DoubleMatrixKey = MatrixDataNumberType<'DoubleMatrixKey'>

export type IntArrayKey = ArrayNumberType<'IntArrayKey'>
export type ByteArrayKey = ArrayNumberType<'ByteArrayKey'>
export type LongArrayKey = ArrayNumberType<'LongArrayKey'>
export type ShortArrayKey = ArrayNumberType<'ShortArrayKey'>
export type FloatArrayKey = ArrayNumberType<'FloatArrayKey'>
export type DoubleArrayKey = ArrayNumberType<'DoubleArrayKey'>

export type StructKey = { KeyTag: 'StructKey'; KeyType: Struct }
export type ChoiceKey<T> = { KeyTag: 'ChoiceKey'; KeyType: T }

export type RaDecKey = { KeyTag: 'RaDecKey'; KeyType: RaDec }
export type EqCoordKey = { KeyTag: 'EqCoordKey'; KeyType: EqCoord }
export type SolarSystemCoordKey = { KeyTag: 'SolarSystemCoordKey'; KeyType: SolarSystemCoord }
export type MinorPlanetCoordKey = { KeyTag: 'MinorPlanetCoordKey'; KeyType: MinorPlanetCoord }
export type CometCoordKey = { KeyTag: 'CometCoordKey'; KeyType: CometCoord }
export type AltAzCoordKey = { KeyTag: 'AltAzCoordKey'; KeyType: AltAzCoord }
export type CoordKey = { KeyTag: 'CoordKey'; KeyType: Coord }

export type BooleanKey = { KeyTag: 'BooleanKey'; KeyType: boolean }
// simple key's
export const intKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<IntKey>(name, 'IntKey', units)

export const longKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<LongKey>(name, 'LongKey', units)

export const shortKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<ShortKey>(name, 'ShortKey', units)

export const floatKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<FloatKey>(name, 'FloatKey', units)

export const doubleKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<DoubleKey>(name, 'DoubleKey', units)

export const byteKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<ByteKey>(name, 'ByteKey', units)

export const stringKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<StringKey>(name, 'StringKey', units)

export const charKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<CharKey>(name, 'CharKey', units)

export const booleanKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<BooleanKey>(name, 'BooleanKey', units)

// time , choice and struct keys
export const structKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<StructKey>(name, 'StructKey', units)

export const utcTimeKey = (name: string, units: Units = 'second') =>
  new BaseKey<TimeKey>(name, 'UTCTimeKey', units)

export const taiTimeKey = (name: string, units: Units = 'second') =>
  new BaseKey<TimeKey>(name, 'TAITimeKey', units)

export const choiceKey = (name: string, units: Units = 'NoUnits') =>
  new ChoiceKeyFactory<ChoiceKey<string>>(name, 'ChoiceKey', units)

// co-ord keys
export const raDecKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<RaDecKey>(name, 'RaDecKey', units)

export const eqCoordKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<EqCoordKey>(name, 'EqCoordKey', units)

export const solarSystemCoordKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<SolarSystemCoordKey>(name, 'SolarSystemCoordKey', units)

export const minorPlanetCoordKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<MinorPlanetCoordKey>(name, 'MinorPlanetCoordKey', units)

export const cometCoordKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<CometCoordKey>(name, 'CometCoordKey', units)

export const altAzCoordKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<AltAzCoordKey>(name, 'AltAzCoordKey', units)

export const coordKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<CoordKey>(name, 'CoordKey', units)

// matrix keys
export const byteMatrixKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<ByteMatrixKey>(name, 'ByteMatrixKey', units)

export const intMatrixKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<IntMatrixKey>(name, 'IntMatrixKey', units)

export const longMatrixKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<LongMatrixKey>(name, 'LongMatrixKey', units)

export const shortMatrixKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<ShortMatrixKey>(name, 'ShortMatrixKey', units)

export const floatMatrixKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<FloatMatrixKey>(name, 'FloatMatrixKey', units)

export const doubleMatrixKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<DoubleMatrixKey>(name, 'DoubleMatrixKey', units)

// array keys
export const byteArrayKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<ByteArrayKey>(name, 'ByteArrayKey', units)

export const intArrayKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<IntArrayKey>(name, 'IntArrayKey', units)

export const longArrayKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<LongArrayKey>(name, 'LongArrayKey', units)

export const shortArrayKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<ShortArrayKey>(name, 'ShortArrayKey', units)

export const floatArrayKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<FloatArrayKey>(name, 'FloatArrayKey', units)

export const doubleArrayKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<DoubleArrayKey>(name, 'DoubleArrayKey', units)
