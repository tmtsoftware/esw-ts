import { BaseKey } from './BaseKey'
import { ChoiceKeyFactory } from './ChoiceKeyFactory'
import type {
  AltAzCoord,
  CometCoord,
  Coord,
  EqCoord,
  MinorPlanetCoord,
  RaDec,
  SolarSystemCoord
} from './Coord'
import type { Struct } from './Struct'
import type { Units } from './Units'

/**
 * Generic marker type for creating various types of Keys.
 *
 * @param L the type of values that will sit against the key in Parameter
 */
/**
 * @internal
 */
export type KTag<T extends Key> = T['keyTag']
/**
 * @internal
 */
export type KType<T extends Key> = T['keyType']
/**
 * @internal
 */
type mkRawKey<KeyTag, KeyType> = {
  keyTag: KeyTag
  keyType: KeyType
}
/**
 * @internal
 */
type NumberKey<KeyTag> = mkRawKey<KeyTag, number>
/**
 * @internal
 */
type ArrayKey<KeyTag> = mkRawKey<KeyTag, number[]>
/**
 * @internal
 */
type MatrixKey<KeyTag> = mkRawKey<KeyTag, number[][]>
/**
 * @internal
 */
type BaseStringKey<KeyTag> = mkRawKey<KeyTag, string>
/**
 * @internal
 */
export interface IntKey extends NumberKey<'IntKey'> {}
/**
 * @internal
 */
export interface LongKey extends NumberKey<'LongKey'> {}
/**
 * @internal
 */
export interface ShortKey extends NumberKey<'ShortKey'> {}
/**
 * @internal
 */
export interface FloatKey extends NumberKey<'FloatKey'> {}
/**
 * @internal
 */
export interface DoubleKey extends NumberKey<'DoubleKey'> {}
/**
 * @internal
 */
export interface ByteKey extends NumberKey<'ByteKey'> {}
/**
 * @internal
 */
export interface StringKey extends BaseStringKey<'StringKey'> {}
/**
 * @internal
 */
export interface CharKey extends BaseStringKey<'CharKey'> {}
/**
 * @internal
 */
export interface StructKey extends mkRawKey<'StructKey', Struct> {}
/**
 * @internal
 */
export interface ChoiceKey extends mkRawKey<'ChoiceKey', ChoiceKey> {}
/**
 * @internal
 */
export interface IntMatrixKey extends MatrixKey<'IntMatrixKey'> {}
/**
 * @internal
 */
export interface ByteMatrixKey extends MatrixKey<'ByteMatrixKey'> {}
/**
 * @internal
 */
export interface LongMatrixKey extends MatrixKey<'LongMatrixKey'> {}
/**
 * @internal
 */
export interface ShortMatrixKey extends MatrixKey<'ShortMatrixKey'> {}
/**
 * @internal
 */
export interface FloatMatrixKey extends MatrixKey<'FloatMatrixKey'> {}
/**
 * @internal
 */
export interface DoubleMatrixKey extends MatrixKey<'DoubleMatrixKey'> {}
/**
 * @internal
 */
export interface IntArrayKey extends ArrayKey<'IntArrayKey'> {}
/**
 * @internal
 */
export interface ByteArrayKey extends ArrayKey<'ByteArrayKey'> {}
/**
 * @internal
 */
export interface LongArrayKey extends ArrayKey<'LongArrayKey'> {}
/**
 * @internal
 */
export interface ShortArrayKey extends ArrayKey<'ShortArrayKey'> {}
/**
 * @internal
 */
export interface FloatArrayKey extends ArrayKey<'FloatArrayKey'> {}
/**
 * @internal
 */
export interface DoubleArrayKey extends ArrayKey<'DoubleArrayKey'> {}
/**
 * @internal
 */
export interface BooleanKey extends mkRawKey<'BooleanKey', boolean> {}
/**
 * @internal
 */
export interface UTCTimeKey extends BaseStringKey<'UTCTimeKey'> {}
/**
 * @internal
 */
export interface TAITimeKey extends BaseStringKey<'TAITimeKey'> {}
/**
 * @internal
 */
export interface RaDecKey extends mkRawKey<'RaDecKey', RaDec> {}
/**
 * @internal
 */
export interface EqCoordKey extends mkRawKey<'EqCoordKey', EqCoord> {}
/**
 * @internal
 */
export interface SolarSystemCoordKey extends mkRawKey<'SolarSystemCoordKey', SolarSystemCoord> {}
/**
 * @internal
 */
export interface MinorPlanetCoordKey extends mkRawKey<'MinorPlanetCoordKey', MinorPlanetCoord> {}
/**
 * @internal
 */
export interface CometCoordKey extends mkRawKey<'CometCoordKey', CometCoord> {}
/**
 * @internal
 */
export interface AltAzCoordKey extends mkRawKey<'AltAzCoordKey', AltAzCoord> {}
/**
 * @internal
 */
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
 * @internal
 */
const keyFactory = <K extends Key>(keyTag: KTag<K>, defaultUnit: Units = 'NoUnits') => (
  name: string,
  units: Units = defaultUnit
) => new BaseKey<K>(name, keyTag, units)

// Simple Key's
/**
 * Helper functions to create primitive parameters
 */
export const intKey: (name: string, units?: Units) => BaseKey<IntKey> = keyFactory<IntKey>('IntKey')
export const longKey: (name: string, units?: Units) => BaseKey<LongKey> = keyFactory<LongKey>(
  'LongKey'
)
export const shortKey: (name: string, units?: Units) => BaseKey<ShortKey> = keyFactory<ShortKey>(
  'ShortKey'
)
export const floatKey: (name: string, units?: Units) => BaseKey<FloatKey> = keyFactory<FloatKey>(
  'FloatKey'
)
export const doubleKey = keyFactory<DoubleKey>('DoubleKey')
export const byteKey: (name: string, units?: Units) => BaseKey<ByteKey> = keyFactory<ByteKey>(
  'ByteKey'
)
export const stringKey: (name: string, units?: Units) => BaseKey<StringKey> = keyFactory<StringKey>(
  'StringKey'
)
export const charKey: (name: string, units?: Units) => BaseKey<CharKey> = keyFactory<CharKey>(
  'CharKey'
)
export const booleanKey: (
  name: string,
  units?: Units
) => BaseKey<BooleanKey> = keyFactory<BooleanKey>('BooleanKey')

// Matrix Keys

/**
 * A KeyType that has suffix *-MatrixKey holds Matrices
 * Helper functions to create Matrix parameters
 */
export const byteMatrixKey: (
  name: string,
  units?: Units
) => BaseKey<ByteMatrixKey> = keyFactory<ByteMatrixKey>('ByteMatrixKey')

export const intMatrixKey: (
  name: string,
  units?: Units
) => BaseKey<IntMatrixKey> = keyFactory<IntMatrixKey>('IntMatrixKey')

export const longMatrixKey: (
  name: string,
  units?: Units
) => BaseKey<LongMatrixKey> = keyFactory<LongMatrixKey>('LongMatrixKey')

export const shortMatrixKey: (
  name: string,
  units?: Units
) => BaseKey<ShortMatrixKey> = keyFactory<ShortMatrixKey>('ShortMatrixKey')

export const floatMatrixKey: (
  name: string,
  units?: Units
) => BaseKey<FloatMatrixKey> = keyFactory<FloatMatrixKey>('FloatMatrixKey')

export const doubleMatrixKey: (
  name: string,
  units?: Units
) => BaseKey<DoubleMatrixKey> = keyFactory<DoubleMatrixKey>('DoubleMatrixKey')

// Array Keys

/**
 * A KeyType that has suffix *-ArrayKey holds Arrays
 * Helper functions to create Array parameters
 */
export const byteArrayKey: (
  name: string,
  units?: Units
) => BaseKey<ByteArrayKey> = keyFactory<ByteArrayKey>('ByteArrayKey')

export const intArrayKey: (
  name: string,
  units?: Units
) => BaseKey<IntArrayKey> = keyFactory<IntArrayKey>('IntArrayKey')

export const longArrayKey: (
  name: string,
  units?: Units
) => BaseKey<LongArrayKey> = keyFactory<LongArrayKey>('LongArrayKey')

export const shortArrayKey: (
  name: string,
  units?: Units
) => BaseKey<ShortArrayKey> = keyFactory<ShortArrayKey>('ShortArrayKey')

export const floatArrayKey: (
  name: string,
  units?: Units
) => BaseKey<FloatArrayKey> = keyFactory<FloatArrayKey>('FloatArrayKey')

export const doubleArrayKey: (
  name: string,
  units?: Units
) => BaseKey<DoubleArrayKey> = keyFactory<DoubleArrayKey>('DoubleArrayKey')

// Time, Choice and Struct Keys
/**
 * Helper function to create struct parameter
 */
export const structKey: (name: string, units?: Units) => BaseKey<StructKey> = keyFactory<StructKey>(
  'StructKey'
)

export const utcTimeKey: (
  name: string,
  units?: Units
) => BaseKey<UTCTimeKey> = keyFactory<UTCTimeKey>('UTCTimeKey', 'second')

export const taiTimeKey: (
  name: string,
  units?: Units
) => BaseKey<TAITimeKey> = keyFactory<TAITimeKey>('TAITimeKey', 'second')

/**
 * A KeyType that holds Choices
 * @param name a strig for the choice key
 * @param choices list of options to be made available for the choice key
 * @param units the units for the key
 * @tparam L type for choices
 * @return an instance of ChoiceKey for the given name, choices and units
 */
export const choiceKey = <L extends string>(
  name: string,
  choices: readonly L[],
  units: Units = 'NoUnits'
) => new ChoiceKeyFactory<ChoiceKey, readonly L[]>(name, 'ChoiceKey', choices, units)

// Coord Keys
export const raDecKey: (name: string, units?: Units) => BaseKey<RaDecKey> = keyFactory<RaDecKey>(
  'RaDecKey'
)

export const eqCoordKey: (
  name: string,
  units?: Units
) => BaseKey<EqCoordKey> = keyFactory<EqCoordKey>('EqCoordKey')

export const solarSystemCoordKey: (
  name: string,
  units?: Units
) => BaseKey<SolarSystemCoordKey> = keyFactory<SolarSystemCoordKey>('SolarSystemCoordKey')

export const minorPlanetCoordKey: (
  name: string,
  units?: Units
) => BaseKey<MinorPlanetCoordKey> = keyFactory<MinorPlanetCoordKey>('MinorPlanetCoordKey')

export const cometCoordKey: (
  name: string,
  units?: Units
) => BaseKey<CometCoordKey> = keyFactory<CometCoordKey>('CometCoordKey')

export const altAzCoordKey: (
  name: string,
  units?: Units
) => BaseKey<AltAzCoordKey> = keyFactory<AltAzCoordKey>('AltAzCoordKey')

export const coordKey: (name: string, units?: Units) => BaseKey<CoordKey> = keyFactory<CoordKey>(
  'CoordKey'
)
