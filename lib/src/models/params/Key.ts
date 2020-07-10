import * as t from 'io-ts'
import { BaseKey } from './BaseKey'
import { ChoiceKeyFactory } from './ChoiceKeyFactory'
import { StructV } from './Struct'
import { Units, UnitsV } from './Units'

const ParamBodyDecoder = <T>(valuesDec: t.Type<T, unknown>) =>
  t.type({
    keyName: t.string,
    values: t.array(valuesDec),
    units: UnitsV
  })

const RawKey = <KType extends t.Mixed>(kType: KType) => (kTag: string) =>
  t.type({
    KeyTag: t.literal(kTag),
    KeyType: kType,
    paramDecoder: ParamBodyDecoder(kType)
  })

const NumberKey = RawKey(t.number)
export const IntKeyV = NumberKey('IntKey')
export const LongKeyV = NumberKey('LongKey')
export const ShortKeyV = NumberKey('ShortKey')
export const FloatKeyV = NumberKey('FloatKey')
export const DoubleKeyV = NumberKey('DoubleKey')
export const ByteKeyV = NumberKey('ByteKey')

export const BooleanKeyV = RawKey(t.boolean)('BooleanKey')

const RawStringKey = RawKey(t.string)
export const StringKeyV = RawStringKey('StringKey')
export const CharKeyV = RawStringKey('CharKey')

export const UTCTimeKeyV = RawStringKey('UTCTimeKey') // todo: Maybe in future if we implement Time models, use those here
export const TAITimeKeyV = RawStringKey('TAITimeKey') // todo: Maybe in future if we implement Time models, use those here

// Array keys
const ArrayNumberKey = RawKey(t.array(t.number))
export const IntArrayKeyV = ArrayNumberKey('IntArrayKey')
export const LongArrayKeyV = ArrayNumberKey('LongArrayKey')
export const ShortArrayKeyV = ArrayNumberKey('ShortArrayKey')
export const FloatArrayKeyV = ArrayNumberKey('FloatArrayKey')
export const DoubleArrayKeyV = ArrayNumberKey('DoubleArrayKey')
export const ByteArrayKeyV = ArrayNumberKey('ByteArrayKey')

// Matrix keys
const MatrixDataNumberKey = RawKey(t.array(t.array(t.number)))
export const IntMatrixKeyV = MatrixDataNumberKey('IntMatrixKey')
export const LongMatrixKeyV = MatrixDataNumberKey('LongMatrixKey')
export const ShortMatrixKeyV = MatrixDataNumberKey('ShortMatrixKey')
export const FloatMatrixKeyV = MatrixDataNumberKey('FloatMatrixKey')
export const DoubleMatrixKeyV = MatrixDataNumberKey('DoubleMatrixKey')
export const ByteMatrixKeyV = MatrixDataNumberKey('ByteMatrixKey')

export const StructKeyV = RawKey(StructV)('StructKey')

export const ChoiceKeyV = RawKey(t.string)('ChoiceKey')
// export const RaDecKeyV = RawKey(RaDec)('RaDecKey')
// export const EqCoordKeyV = RawKey(EqCoord)('EqCoordKey')
// export const SolarSystemCoordKeyV = RawKey(SolarSystemCoord)('SolarSystemCoordKey')
// export const MinorPlanetCoordKeyV = RawKey(MinorPlanetCoord)('MinorPlanetCoordKey')
// export const CometCoordKeyV = RawKey(CometCoord)('CometCoordKey')
// export const AltAzCoordKeyV = RawKey(AltAzCoord)('AltAzCoordKey')
// export const CoordKeyV = RawKey(Coord)('CoordKey')

export type IntKey = Omit<t.TypeOf<typeof IntKeyV>, 'paramDecoder'>
export type LongKey = Omit<t.TypeOf<typeof LongKeyV>, 'paramDecoder'>
export type ShortKey = Omit<t.TypeOf<typeof ShortKeyV>, 'paramDecoder'>
export type FloatKey = Omit<t.TypeOf<typeof FloatKeyV>, 'paramDecoder'>
export type DoubleKey = Omit<t.TypeOf<typeof DoubleKeyV>, 'paramDecoder'>
export type ByteKey = Omit<t.TypeOf<typeof ByteKeyV>, 'paramDecoder'>
export type StringKey = Omit<t.TypeOf<typeof StringKeyV>, 'paramDecoder'>
export type CharKey = Omit<t.TypeOf<typeof CharKeyV>, 'paramDecoder'>
export type StructKey = Omit<t.TypeOf<typeof StructKeyV>, 'paramDecoder'>
export type ChoiceKey = Omit<t.TypeOf<typeof ChoiceKeyV>, 'paramDecoder'>
export type IntMatrixKey = Omit<t.TypeOf<typeof IntMatrixKeyV>, 'paramDecoder'>
export type ByteMatrixKey = Omit<t.TypeOf<typeof ByteMatrixKeyV>, 'paramDecoder'>
export type LongMatrixKey = Omit<t.TypeOf<typeof LongMatrixKeyV>, 'paramDecoder'>
export type ShortMatrixKey = Omit<t.TypeOf<typeof ShortMatrixKeyV>, 'paramDecoder'>
export type FloatMatrixKey = Omit<t.TypeOf<typeof FloatMatrixKeyV>, 'paramDecoder'>
export type DoubleMatrixKey = Omit<t.TypeOf<typeof DoubleMatrixKeyV>, 'paramDecoder'>
export type IntArrayKey = Omit<t.TypeOf<typeof IntArrayKeyV>, 'paramDecoder'>
export type ByteArrayKey = Omit<t.TypeOf<typeof ByteArrayKeyV>, 'paramDecoder'>
export type LongArrayKey = Omit<t.TypeOf<typeof LongArrayKeyV>, 'paramDecoder'>
export type ShortArrayKey = Omit<t.TypeOf<typeof ShortArrayKeyV>, 'paramDecoder'>
export type FloatArrayKey = Omit<t.TypeOf<typeof FloatArrayKeyV>, 'paramDecoder'>
export type DoubleArrayKey = Omit<t.TypeOf<typeof DoubleArrayKeyV>, 'paramDecoder'>
export type BooleanKey = Omit<t.TypeOf<typeof BooleanKeyV>, 'paramDecoder'>
export type UTCTimeKey = Omit<t.TypeOf<typeof UTCTimeKeyV>, 'paramDecoder'>
export type TAITimeKey = Omit<t.TypeOf<typeof TAITimeKeyV>, 'paramDecoder'>
// RaDecKeyV,
// EqCoordKeyV,
// SolarSystemCoordKeyV,
// MinorPlanetCoordKeyV,
// CometCoordKeyV,
// AltAzCoordKeyV,
// CoordKeyV,

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

export const Keys = {
  IntKey: IntKeyV,
  LongKey: LongKeyV,
  ShortKey: ShortKeyV,
  FloatKey: FloatKeyV,
  DoubleKey: DoubleKeyV,
  ByteKey: ByteKeyV,
  BooleanKey: BooleanKeyV,
  StringKey: StringKeyV,
  CharKey: CharKeyV,
  UTCTimeKey: UTCTimeKeyV,
  TAITimeKey: TAITimeKeyV,
  IntArrayKey: IntArrayKeyV,
  LongArrayKey: LongArrayKeyV,
  ShortArrayKey: ShortArrayKeyV,
  FloatArrayKey: FloatArrayKeyV,
  DoubleArrayKey: DoubleArrayKeyV,
  ByteArrayKey: ByteArrayKeyV,
  IntMatrixKey: IntMatrixKeyV,
  LongMatrixKey: LongMatrixKeyV,
  ShortMatrixKey: ShortMatrixKeyV,
  FloatMatrixKey: FloatMatrixKeyV,
  DoubleMatrixKey: DoubleMatrixKeyV,
  ByteMatrixKey: ByteMatrixKeyV,
  StructKey: StructKeyV,
  ChoiceKey: ChoiceKeyV
  // RaDecKeyV: RaDecKeyV,
  // EqCoordKeyV: EqCoordKeyV,
  // SolarSystemCoordKeyV: SolarSystemCoordKeyV,
  // MinorPlanetCoordKeyV: MinorPlanetCoordKeyV,
  // CometCoordKeyV: CometCoordKeyV,
  // AltAzCoordKeyV: AltAzCoordKeyV,
  // CoordKeyV: CoordKeyV
}
export const KeyTag = t.keyof(Keys)
export type KeyTag = t.TypeOf<typeof KeyTag>

const keyFactory = <KType extends Key>(keyTag: KType['KeyTag'], defaultUnit: Units = 'NoUnits') => (
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
export const utcTimeKey = keyFactory<UTCTimeKey>('UTCTimeKey', 'second')
export const taiTimeKey = keyFactory<TAITimeKey>('TAITimeKey', 'second')

export const choiceKey = (name: string, units: Units = 'NoUnits') =>
  new ChoiceKeyFactory<ChoiceKey>(name, 'ChoiceKey', units)

// co-ord keys
// export const raDecKey = keyFactory<RaDecKey>('RaDecKey')
// export const eqCoordKey = keyFactory<EqCoordKey>('EqCoordKey')
// export const solarSystemCoordKey = keyFactory<SolarSystemCoordKey>('SolarSystemCoordKey')
// export const minorPlanetCoordKey = keyFactory<MinorPlanetCoordKey>('MinorPlanetCoordKey')
// export const cometCoordKey = keyFactory<CometCoordKey>('CometCoordKey')
// export const altAzCoordKey = keyFactory<AltAzCoordKey>('AltAzCoordKey')
// export const coordKey = keyFactory<CoordKey>('CoordKey')
