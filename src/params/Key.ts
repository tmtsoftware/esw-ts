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
  TimeTag,
} from './Coord'
import { MatrixData } from './MatrixData'

export interface Struct {
  paramSet: Parameter<Key>[]
}

export type KeyType<T extends Key> = T['KeyType']

export type KeyTag<T extends Key> = T['KeyTag']

export type Key =
  | IntKey
  | StringKey
  | IntArrayKey
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
  | MatrixKey

// Keys
export type IntKey = { KeyTag: 'IntKey'; KeyType: number }
export type StringKey = { KeyTag: 'StringKey'; KeyType: string }
export type IntArrayKey = { KeyTag: 'IntArrayKey'; KeyType: number[] }
export type StructKey = { KeyTag: 'StructKey'; KeyType: Struct }
export type ChoiceKey<T> = { KeyTag: 'ChoiceKey'; KeyType: T }
export type TimeKey = { KeyTag: TimeTag; KeyType: string } // TBD
export type MatrixKey =
  | IntMatrixKey
  | ByteMatrixKey
  | LongMatrixKey
  | ShortMatrixKey
  | FloatMatrixKey
  | DoubleMatrixKey
export type ByteMatrixKey = {
  KeyTag: 'ByteMatrixKey'
  KeyType: MatrixData<number>
}
export type IntMatrixKey = {
  KeyTag: 'IntMatrixKey'
  KeyType: MatrixData<number>
}
export type LongMatrixKey = {
  KeyTag: 'LongMatrixKey'
  KeyType: MatrixData<number>
}
export type ShortMatrixKey = {
  KeyTag: 'ShortMatrixKey'
  KeyType: MatrixData<number>
}
export type FloatMatrixKey = {
  KeyTag: 'FloatMatrixKey'
  KeyType: MatrixData<number>
}
export type DoubleMatrixKey = {
  KeyTag: 'DoubleMatrixKey'
  KeyType: MatrixData<number>
}

export type RaDecKey = { KeyTag: 'RaDecKey'; KeyType: RaDec }
export type EqCoordKey = { KeyTag: 'EqCoordKey'; KeyType: EqCoord }
export type SolarSystemCoordKey = { KeyTag: 'SolarSystemCoordKey'; KeyType: SolarSystemCoord }
export type MinorPlanetCoordKey = { KeyTag: 'MinorPlanetCoordKey'; KeyType: MinorPlanetCoord }
export type CometCoordKey = { KeyTag: 'CometCoordKey'; KeyType: CometCoord }
export type AltAzCoordKey = { KeyTag: 'AltAzCoordKey'; KeyType: AltAzCoord }
export type CoordKey = { KeyTag: 'CoordKey'; KeyType: Coord }

// Key Api
export const intKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<IntKey>(name, 'IntKey', units)

export const stringKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<StringKey>(name, 'StringKey', units)

export const intArrayKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<IntArrayKey>(name, 'IntArrayKey', units)

export const structKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<StructKey>(name, 'StructKey', units)

export const utcTimeKey = (name: string, units: Units = 'second') =>
  new BaseKey<TimeKey>(name, 'UTCTimeKey', units)

export const taiTimeKey = (name: string, units: Units = 'second') =>
  new BaseKey<TimeKey>(name, 'TAITimeKey', units)

export const choiceKey = (name: string, units: Units = 'NoUnits') =>
  new ChoiceKeyFactory<ChoiceKey<string>>(name, 'ChoiceKey', units)

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
