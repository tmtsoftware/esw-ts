import { BaseKey } from './BaseKey'
import { ChoiceKeyFactory } from './ChoiceKeyFactory'
import type {
  EqCoord,
  Coord,
  RaDec,
  AltAzCoord,
  CometCoord,
  MinorPlanetCoord,
  SolarSystemCoord
} from './Coord'
import type { Struct } from './Struct'
import type { Units } from './Units'

/**
 * Generic marker type for creating various types of Keys.
 *
 * @param L the type of values that will sit against the key in Parameter
 */

export type KTag<T extends Key> = T['keyTag']
export type KType<T extends Key> = T['keyType']

type mkRawKey<KeyTag, KeyType> = {
  keyTag: KeyTag
  keyType: KeyType
}
type NumberKey<KeyTag> = mkRawKey<KeyTag, number>
type ArrayKey<KeyTag> = mkRawKey<KeyTag, number[]>
type MatrixKey<KeyTag> = mkRawKey<KeyTag, number[][]>
type BaseStringKey<KeyTag> = mkRawKey<KeyTag, string>

export interface IntKey extends NumberKey<'IntKey'> {}

export interface LongKey extends NumberKey<'LongKey'> {}

export interface ShortKey extends NumberKey<'ShortKey'> {}

export interface FloatKey extends NumberKey<'FloatKey'> {}

export interface DoubleKey extends NumberKey<'DoubleKey'> {}

export interface ByteKey extends NumberKey<'ByteKey'> {}

export interface StringKey extends BaseStringKey<'StringKey'> {}

export interface CharKey extends BaseStringKey<'CharKey'> {}

export interface StructKey extends mkRawKey<'StructKey', Struct> {}

export interface ChoiceKey extends mkRawKey<'ChoiceKey', ChoiceKey> {}

export interface IntMatrixKey extends MatrixKey<'IntMatrixKey'> {}

export interface ByteMatrixKey extends MatrixKey<'ByteMatrixKey'> {}

export interface LongMatrixKey extends MatrixKey<'LongMatrixKey'> {}

export interface ShortMatrixKey extends MatrixKey<'ShortMatrixKey'> {}

export interface FloatMatrixKey extends MatrixKey<'FloatMatrixKey'> {}

export interface DoubleMatrixKey extends MatrixKey<'DoubleMatrixKey'> {}

export interface IntArrayKey extends ArrayKey<'IntArrayKey'> {}

export interface ByteArrayKey extends ArrayKey<'ByteArrayKey'> {}

export interface LongArrayKey extends ArrayKey<'LongArrayKey'> {}

export interface ShortArrayKey extends ArrayKey<'ShortArrayKey'> {}

export interface FloatArrayKey extends ArrayKey<'FloatArrayKey'> {}

export interface DoubleArrayKey extends ArrayKey<'DoubleArrayKey'> {}

export interface BooleanKey extends mkRawKey<'BooleanKey', boolean> {}

export interface UTCTimeKey extends BaseStringKey<'UTCTimeKey'> {}

export interface TAITimeKey extends BaseStringKey<'TAITimeKey'> {}

export interface RaDecKey extends mkRawKey<'RaDecKey', RaDec> {}

export interface EqCoordKey extends mkRawKey<'EqCoordKey', EqCoord> {}

export interface SolarSystemCoordKey extends mkRawKey<'SolarSystemCoordKey', SolarSystemCoord> {}

export interface MinorPlanetCoordKey extends mkRawKey<'MinorPlanetCoordKey', MinorPlanetCoord> {}

export interface CometCoordKey extends mkRawKey<'CometCoordKey', CometCoord> {}

export interface AltAzCoordKey extends mkRawKey<'AltAzCoordKey', AltAzCoord> {}

export interface CoordKey extends mkRawKey<'CoordKey', Coord> {}

/**
 * Keys defined for consumption in Typescript code
 * @category Params
 */
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
  | UTCTimeKey
  | TAITimeKey
  | RaDecKey
  | EqCoordKey
  | SolarSystemCoordKey
  | MinorPlanetCoordKey
  | CometCoordKey
  | AltAzCoordKey
  | CoordKey

// ---------------------------------
// Key Factories
// ---------------------------------
/**
 * A Key factory that allows name and unit to be specified during creation. Holds instances of primitives such as
 * char, int, String etc.
 *
 * @tparam K the type of key that will sit against the keyTag in Parameter
 * @param keyTag  the type of values that will sit against the key in Parameter
 * @param defaultUnit applicable units
 * @private
 */
const keyFactory = <K extends Key>(keyTag: KTag<K>, defaultUnit: Units = 'NoUnits') => (
  name: string,
  units: Units = defaultUnit
) => new BaseKey<K>(name, keyTag, units)

// Simple Key's
/**
 * Helper functions to create primitive parameters
 */
export const intKey = keyFactory<IntKey>('IntKey')
export const longKey = keyFactory<LongKey>('LongKey')
export const shortKey = keyFactory<ShortKey>('ShortKey')
export const floatKey = keyFactory<FloatKey>('FloatKey')
export const doubleKey = keyFactory<DoubleKey>('DoubleKey')
export const byteKey = keyFactory<ByteKey>('ByteKey')
export const stringKey = keyFactory<StringKey>('StringKey')
export const charKey = keyFactory<CharKey>('CharKey')
export const booleanKey = keyFactory<BooleanKey>('BooleanKey')

// Matrix Keys

/**
 * A KeyType that has suffix *-MatrixKey holds Matrices
 * Helper functions to create Matrix parameters
 */
export const byteMatrixKey = keyFactory<ByteMatrixKey>('ByteMatrixKey')
export const intMatrixKey = keyFactory<IntMatrixKey>('IntMatrixKey')
export const longMatrixKey = keyFactory<LongMatrixKey>('LongMatrixKey')
export const shortMatrixKey = keyFactory<ShortMatrixKey>('ShortMatrixKey')
export const floatMatrixKey = keyFactory<FloatMatrixKey>('FloatMatrixKey')
export const doubleMatrixKey = keyFactory<DoubleMatrixKey>('DoubleMatrixKey')

// Array Keys

/**
 * A KeyType that has suffix *-ArrayKey holds Arrays
 * Helper functions to create Array parameters
 */
export const byteArrayKey = keyFactory<ByteArrayKey>('ByteArrayKey')
export const intArrayKey = keyFactory<IntArrayKey>('IntArrayKey')
export const longArrayKey = keyFactory<LongArrayKey>('LongArrayKey')
export const shortArrayKey = keyFactory<ShortArrayKey>('ShortArrayKey')
export const floatArrayKey = keyFactory<FloatArrayKey>('FloatArrayKey')
export const doubleArrayKey = keyFactory<DoubleArrayKey>('DoubleArrayKey')

// Time, Choice and Struct Keys
/**
 * Helper function to create struct parameter
 */
export const structKey = keyFactory<StructKey>('StructKey')
export const utcTimeKey = keyFactory<UTCTimeKey>('UTCTimeKey', 'second')
export const taiTimeKey = keyFactory<TAITimeKey>('TAITimeKey', 'second')

/**
 * A KeyType that holds Choices
 * @param name a strig for the choice key
 * @param choices list of options to be made available for the choice key
 * @param units the units for the key
 * @return an instance of ChoiceKey for the given name, choices and units
 */
export const choiceKey = <L extends string>(
  name: string,
  choices: readonly L[],
  units: Units = 'NoUnits'
) => new ChoiceKeyFactory<ChoiceKey, readonly L[]>(name, 'ChoiceKey', choices, units)

// Coord Keys
export const raDecKey = keyFactory<RaDecKey>('RaDecKey')
export const eqCoordKey = keyFactory<EqCoordKey>('EqCoordKey')
export const solarSystemCoordKey = keyFactory<SolarSystemCoordKey>('SolarSystemCoordKey')
export const minorPlanetCoordKey = keyFactory<MinorPlanetCoordKey>('MinorPlanetCoordKey')
export const cometCoordKey = keyFactory<CometCoordKey>('CometCoordKey')
export const altAzCoordKey = keyFactory<AltAzCoordKey>('AltAzCoordKey')
export const coordKey = keyFactory<CoordKey>('CoordKey')
