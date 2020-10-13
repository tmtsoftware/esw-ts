import * as D from 'io-ts/lib/Decoder'
import { char, ciLiteral, Decoder } from '../../utils/Decoder'
import * as C from './../../decoders/CoordDecoders'
import { BaseKey } from './BaseKey'
import { ChoiceKeyFactory } from './ChoiceKeyFactory'
import { StructD } from './Struct'
import { Units, UnitsD } from './Units'

// ---------------------------------
// Key, ParameterBody Schema
// ---------------------------------

type ParamDecoder<T> = Decoder<{
  keyName: string
  values: T[]
  units: Units
}>

/**
 * Generic marker type for creating various types of Keys.
 *
 * @param L the type of values that will sit against the key in Parameter
 */
type KeyType<L extends string, T> = {
  keyTag: L
  keyType: T
}

export type KTag<T extends Key> = T['keyTag']
export type KType<T extends Key> = T['keyType']

// ---------------------------------
// Key, ParameterBody Decoders
// ---------------------------------
const ParamBodyDecoder = <T>(valuesDec: Decoder<T>): ParamDecoder<T> =>
  D.type({
    keyName: D.string,
    values: D.array(valuesDec),
    units: UnitsD
  })

export const paramDecoders: Record<string, ParamDecoder<unknown>> = {}

const mkRawKeyD = <KType>(kType: Decoder<KType>) => <KTag extends string>(
  kTag: KTag
): Decoder<KeyType<KTag, KType>> => {
  // populate [key -> decoder] record, used while decoding parameter
  paramDecoders[kTag] = ParamBodyDecoder(kType)

  return D.type({
    keyTag: ciLiteral(kTag),
    keyType: kType
  })
}

// Simple Keys
const mkNumberKeyD = mkRawKeyD<number>(D.number)
const IntKeyD = mkNumberKeyD('IntKey')
const LongKeyD = mkNumberKeyD('LongKey')
const ShortKeyD = mkNumberKeyD('ShortKey')
const FloatKeyD = mkNumberKeyD('FloatKey')
const DoubleKeyD = mkNumberKeyD('DoubleKey')
const ByteKeyD = mkNumberKeyD('ByteKey')

const BooleanKeyD = mkRawKeyD(D.boolean)('BooleanKey')

const CharKeyD = mkRawKeyD(char)('CharKey')

const mkRawStringKeyD = mkRawKeyD(D.string)
const StringKeyD = mkRawStringKeyD('StringKey')

const UTCTimeKeyD = mkRawStringKeyD('UTCTimeKey') // todo: Maybe in future if we implement Time models, use those here
const TAITimeKeyD = mkRawStringKeyD('TAITimeKey') // todo: Maybe in future if we implement Time models, use those here

// Array Keys
const mkArrayNumberKeyD = mkRawKeyD(D.array(D.number))
const IntArrayKeyD = mkArrayNumberKeyD('IntArrayKey')
const LongArrayKeyD = mkArrayNumberKeyD('LongArrayKey')
const ShortArrayKeyD = mkArrayNumberKeyD('ShortArrayKey')
const FloatArrayKeyD = mkArrayNumberKeyD('FloatArrayKey')
const DoubleArrayKeyD = mkArrayNumberKeyD('DoubleArrayKey')
const ByteArrayKeyD = mkArrayNumberKeyD('ByteArrayKey')

// Matrix Keys
const mkMatrixDataNumberKeyD = mkRawKeyD(D.array(D.array(D.number)))
const IntMatrixKeyD = mkMatrixDataNumberKeyD('IntMatrixKey')
const LongMatrixKeyD = mkMatrixDataNumberKeyD('LongMatrixKey')
const ShortMatrixKeyD = mkMatrixDataNumberKeyD('ShortMatrixKey')
const FloatMatrixKeyD = mkMatrixDataNumberKeyD('FloatMatrixKey')
const DoubleMatrixKeyD = mkMatrixDataNumberKeyD('DoubleMatrixKey')
const ByteMatrixKeyD = mkMatrixDataNumberKeyD('ByteMatrixKey')

// Coord Keys
const RaDecKeyD = mkRawKeyD(C.RaDecD)('RaDecKey')
const EqCoordKeyD = mkRawKeyD(C.EqCoordD)('EqCoordKey')
const SolarSystemCoordKeyD = mkRawKeyD(C.SolarSystemCoordD)('SolarSystemCoordKey')
const MinorPlanetCoordKeyD = mkRawKeyD(C.MinorPlanetCoordD)('MinorPlanetCoordKey')
const CometCoordKeyD = mkRawKeyD(C.CometCoordD)('CometCoordKey')
const AltAzCoordKeyD = mkRawKeyD(C.AltAzCoordD)('AltAzCoordKey')
const CoordKeyD = mkRawKeyD(C.CoordD)('CoordKey')

const StructKeyD = mkRawKeyD(StructD)('StructKey')
const ChoiceKeyD = mkRawKeyD(D.string)('ChoiceKey')

export type IntKey = D.TypeOf<typeof IntKeyD>
export type LongKey = D.TypeOf<typeof LongKeyD>
export type ShortKey = D.TypeOf<typeof ShortKeyD>
export type FloatKey = D.TypeOf<typeof FloatKeyD>
export type DoubleKey = D.TypeOf<typeof DoubleKeyD>
export type ByteKey = D.TypeOf<typeof ByteKeyD>
export type StringKey = D.TypeOf<typeof StringKeyD>
export type CharKey = D.TypeOf<typeof CharKeyD>
export type StructKey = D.TypeOf<typeof StructKeyD>
export type ChoiceKey = D.TypeOf<typeof ChoiceKeyD>
export type IntMatrixKey = D.TypeOf<typeof IntMatrixKeyD>
export type ByteMatrixKey = D.TypeOf<typeof ByteMatrixKeyD>
export type LongMatrixKey = D.TypeOf<typeof LongMatrixKeyD>
export type ShortMatrixKey = D.TypeOf<typeof ShortMatrixKeyD>
export type FloatMatrixKey = D.TypeOf<typeof FloatMatrixKeyD>
export type DoubleMatrixKey = D.TypeOf<typeof DoubleMatrixKeyD>
export type IntArrayKey = D.TypeOf<typeof IntArrayKeyD>
export type ByteArrayKey = D.TypeOf<typeof ByteArrayKeyD>
export type LongArrayKey = D.TypeOf<typeof LongArrayKeyD>
export type ShortArrayKey = D.TypeOf<typeof ShortArrayKeyD>
export type FloatArrayKey = D.TypeOf<typeof FloatArrayKeyD>
export type DoubleArrayKey = D.TypeOf<typeof DoubleArrayKeyD>
export type BooleanKey = D.TypeOf<typeof BooleanKeyD>
export type UTCTimeKey = D.TypeOf<typeof UTCTimeKeyD>
export type TAITimeKey = D.TypeOf<typeof TAITimeKeyD>
export type RaDecKey = D.TypeOf<typeof RaDecKeyD>
export type EqCoordKey = D.TypeOf<typeof EqCoordKeyD>
export type SolarSystemCoordKey = D.TypeOf<typeof SolarSystemCoordKeyD>
export type MinorPlanetCoordKey = D.TypeOf<typeof MinorPlanetCoordKeyD>
export type CometCoordKey = D.TypeOf<typeof CometCoordKeyD>
export type AltAzCoordKey = D.TypeOf<typeof AltAzCoordKeyD>
export type CoordKey = D.TypeOf<typeof CoordKeyD>

/**
 * Keys defined for consumption in Typescript code
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

// -----------------------------------------------------------
// Key Literals Decoder, for ex. 'IntKey', 'StringKey' etc.
// -----------------------------------------------------------
const keys = Object.keys(paramDecoders)
export const keyTagDecoder = ciLiteral(keys[0], ...keys.slice(1))
