import { BaseKey } from 'models/params/BaseKey'
import { ChoiceKeyFactory } from 'models/params/ChoiceKeyFactory'
import {
  AltAzCoord,
  CometCoord,
  Coord,
  EqCoord,
  MinorPlanetCoord,
  RaDec,
  SolarSystemCoord
} from 'models/params/Coord'
import { Parameter } from 'models/params/Parameter'
import { Units } from 'models/params/Units'

export type KeyType<T extends Key> = T['KeyType']
export type KeyTag<T extends Key> = T['KeyTag']

type RawKey<KTag, KType> = { KeyTag: KTag; KeyType: KType }

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
  | ChoiceKey
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

// Simple keys
type NumberKey<KTag> = RawKey<KTag, number>
export type IntKey = NumberKey<'IntKey'>
export type LongKey = NumberKey<'LongKey'>
export type ShortKey = NumberKey<'ShortKey'>
export type FloatKey = NumberKey<'FloatKey'>
export type DoubleKey = NumberKey<'DoubleKey'>
export type ByteKey = NumberKey<'ByteKey'>

export type BooleanKey = RawKey<'BooleanKey', boolean>

type RawStringKey<KTag> = RawKey<KTag, string>
export type StringKey = RawStringKey<'StringKey'>
export type CharKey = RawStringKey<'CharKey'>
export type TimeKey = RawStringKey<TimeTag> // todo: Maybe in future if we implement Time models, use those here

// Array keys
type ArrayNumberKey<KTag> = RawKey<KTag, number[]>
export type IntArrayKey = ArrayNumberKey<'IntArrayKey'>
export type LongArrayKey = ArrayNumberKey<'LongArrayKey'>
export type ShortArrayKey = ArrayNumberKey<'ShortArrayKey'>
export type FloatArrayKey = ArrayNumberKey<'FloatArrayKey'>
export type DoubleArrayKey = ArrayNumberKey<'DoubleArrayKey'>
export type ByteArrayKey = ArrayNumberKey<'ByteArrayKey'>

// Matrix keys
type MatrixDataNumberKey<KTag> = RawKey<KTag, number[][]>
export type IntMatrixKey = MatrixDataNumberKey<'IntMatrixKey'>
export type LongMatrixKey = MatrixDataNumberKey<'LongMatrixKey'>
export type ShortMatrixKey = MatrixDataNumberKey<'ShortMatrixKey'>
export type FloatMatrixKey = MatrixDataNumberKey<'FloatMatrixKey'>
export type DoubleMatrixKey = MatrixDataNumberKey<'DoubleMatrixKey'>
export type ByteMatrixKey = MatrixDataNumberKey<'ByteMatrixKey'>

export interface Struct {
  paramSet: Parameter<Key>[]
}
export type StructKey = RawKey<'StructKey', Struct>

export type ChoiceKey = RawKey<'ChoiceKey', string>
export type RaDecKey = RawKey<'RaDecKey', RaDec>
export type EqCoordKey = RawKey<'EqCoordKey', EqCoord>
export type SolarSystemCoordKey = RawKey<'SolarSystemCoordKey', SolarSystemCoord>
export type MinorPlanetCoordKey = RawKey<'MinorPlanetCoordKey', MinorPlanetCoord>
export type CometCoordKey = RawKey<'CometCoordKey', CometCoord>
export type AltAzCoordKey = RawKey<'AltAzCoordKey', AltAzCoord>
export type CoordKey = RawKey<'CoordKey', Coord>

const keyFactory = <KType extends Key>(keyTag: KeyTag<KType>, defaultUnit: Units = 'NoUnits') => (
  name: string,
  units: Units = defaultUnit
) => new BaseKey<KType>(name, keyTag, units)

// simple key's
export const intKey = keyFactory<IntKey>('IntKey')
export const longKey = keyFactory<LongKey>('LongKey')
export const shortKey = keyFactory<ShortKey>('ShortKey')
export const floatKey = keyFactory<FloatKey>('FloatKey')
export const doubleKey = keyFactory<DoubleKey>('DoubleKey')
export const byteKey = keyFactory<ByteKey>('ByteKey')
export const stringKey = keyFactory<StringKey>('StringKey')
export const charKey = keyFactory<CharKey>('CharKey')
export const booleanKey = keyFactory<BooleanKey>('BooleanKey')

// matrix keys
export const byteMatrixKey = keyFactory<ByteMatrixKey>('ByteMatrixKey')
export const intMatrixKey = keyFactory<IntMatrixKey>('IntMatrixKey')
export const longMatrixKey = keyFactory<LongMatrixKey>('LongMatrixKey')
export const shortMatrixKey = keyFactory<ShortMatrixKey>('ShortMatrixKey')
export const floatMatrixKey = keyFactory<FloatMatrixKey>('FloatMatrixKey')
export const doubleMatrixKey = keyFactory<DoubleMatrixKey>('DoubleMatrixKey')

// array keys
export const byteArrayKey = keyFactory<ByteArrayKey>('ByteArrayKey')
export const intArrayKey = keyFactory<IntArrayKey>('IntArrayKey')
export const longArrayKey = keyFactory<LongArrayKey>('LongArrayKey')
export const shortArrayKey = keyFactory<ShortArrayKey>('ShortArrayKey')
export const floatArrayKey = keyFactory<FloatArrayKey>('FloatArrayKey')
export const doubleArrayKey = keyFactory<DoubleArrayKey>('DoubleArrayKey')

// time, choice and struct keys
export const structKey = keyFactory<StructKey>('StructKey')
export const utcTimeKey = keyFactory<TimeKey>('UTCTimeKey', 'second')
export const taiTimeKey = keyFactory<TimeKey>('TAITimeKey', 'second')

export const choiceKey = (name: string, units: Units = 'NoUnits') =>
  new ChoiceKeyFactory<ChoiceKey>(name, 'ChoiceKey', units)

// co-ord keys
export const raDecKey = keyFactory<RaDecKey>('RaDecKey')
export const eqCoordKey = keyFactory<EqCoordKey>('EqCoordKey')
export const solarSystemCoordKey = keyFactory<SolarSystemCoordKey>('SolarSystemCoordKey')
export const minorPlanetCoordKey = keyFactory<MinorPlanetCoordKey>('MinorPlanetCoordKey')
export const cometCoordKey = keyFactory<CometCoordKey>('CometCoordKey')
export const altAzCoordKey = keyFactory<AltAzCoordKey>('AltAzCoordKey')
export const coordKey = keyFactory<CoordKey>('CoordKey')
