import * as t from 'io-ts'
import { BaseKey } from './BaseKey'
import { ChoiceKeyFactory } from './ChoiceKeyFactory'
import { Struct } from './Struct'
import { Units } from './Units'

const ParamBodyDecoder = <T>(valuesDec: t.Type<T, unknown>) =>
  t.type({
    keyName: t.string,
    values: t.array(valuesDec),
    units: Units
  })

const RawKey = <KType extends t.Mixed>(kType: KType) => (kTag: string) =>
  t.type({
    KeyTag: t.literal(kTag),
    KeyType: kType,
    paramDecoder: ParamBodyDecoder(kType)
  })

const NumberKey = RawKey(t.number)
export const IntKey = NumberKey('IntKey')
export const LongKey = NumberKey('LongKey')
export const ShortKey = NumberKey('ShortKey')
export const FloatKey = NumberKey('FloatKey')
export const DoubleKey = NumberKey('DoubleKey')
export const ByteKey = NumberKey('ByteKey')

export const BooleanKey = RawKey(t.boolean)('BooleanKey')

const RawStringKey = RawKey(t.string)
export const StringKey = RawStringKey('StringKey')
export const CharKey = RawStringKey('CharKey')

export const UTCTimeKey = RawStringKey('UTCTimeKey') // todo: Maybe in future if we implement Time models, use those here
export const TAITimeKey = RawStringKey('TAITimeKey') // todo: Maybe in future if we implement Time models, use those here

// Array keys
const ArrayNumberKey = RawKey(t.array(t.number))
export const IntArrayKey = ArrayNumberKey('IntArrayKey')
export const LongArrayKey = ArrayNumberKey('LongArrayKey')
export const ShortArrayKey = ArrayNumberKey('ShortArrayKey')
export const FloatArrayKey = ArrayNumberKey('FloatArrayKey')
export const DoubleArrayKey = ArrayNumberKey('DoubleArrayKey')
export const ByteArrayKey = ArrayNumberKey('ByteArrayKey')

// Matrix keys
const MatrixDataNumberKey = RawKey(t.array(t.array(t.number)))
export const IntMatrixKey = MatrixDataNumberKey('IntMatrixKey')
export const LongMatrixKey = MatrixDataNumberKey('LongMatrixKey')
export const ShortMatrixKey = MatrixDataNumberKey('ShortMatrixKey')
export const FloatMatrixKey = MatrixDataNumberKey('FloatMatrixKey')
export const DoubleMatrixKey = MatrixDataNumberKey('DoubleMatrixKey')
export const ByteMatrixKey = MatrixDataNumberKey('ByteMatrixKey')

export const StructKey = RawKey(Struct)('StructKey')

export const ChoiceKey = RawKey(t.string)('ChoiceKey')
// export const RaDecKey = RawKey(RaDec)('RaDecKey')
// export const EqCoordKey = RawKey(EqCoord)('EqCoordKey')
// export const SolarSystemCoordKey = RawKey(SolarSystemCoord)('SolarSystemCoordKey')
// export const MinorPlanetCoordKey = RawKey(MinorPlanetCoord)('MinorPlanetCoordKey')
// export const CometCoordKey = RawKey(CometCoord)('CometCoordKey')
// export const AltAzCoordKey = RawKey(AltAzCoord)('AltAzCoordKey')
// export const CoordKey = RawKey(Coord)('CoordKey')

export type IntKey = Omit<t.TypeOf<typeof IntKey>, 'paramDecoder'>
export type LongKey = Omit<t.TypeOf<typeof LongKey>, 'paramDecoder'>
export type ShortKey = Omit<t.TypeOf<typeof ShortKey>, 'paramDecoder'>
export type FloatKey = Omit<t.TypeOf<typeof FloatKey>, 'paramDecoder'>
export type DoubleKey = Omit<t.TypeOf<typeof DoubleKey>, 'paramDecoder'>
export type ByteKey = Omit<t.TypeOf<typeof ByteKey>, 'paramDecoder'>
export type StringKey = Omit<t.TypeOf<typeof StringKey>, 'paramDecoder'>
export type CharKey = Omit<t.TypeOf<typeof CharKey>, 'paramDecoder'>
export type StructKey = Omit<t.TypeOf<typeof StructKey>, 'paramDecoder'>
export type ChoiceKey = Omit<t.TypeOf<typeof ChoiceKey>, 'paramDecoder'>
export type IntMatrixKey = Omit<t.TypeOf<typeof IntMatrixKey>, 'paramDecoder'>
export type ByteMatrixKey = Omit<t.TypeOf<typeof ByteMatrixKey>, 'paramDecoder'>
export type LongMatrixKey = Omit<t.TypeOf<typeof LongMatrixKey>, 'paramDecoder'>
export type ShortMatrixKey = Omit<t.TypeOf<typeof ShortMatrixKey>, 'paramDecoder'>
export type FloatMatrixKey = Omit<t.TypeOf<typeof FloatMatrixKey>, 'paramDecoder'>
export type DoubleMatrixKey = Omit<t.TypeOf<typeof DoubleMatrixKey>, 'paramDecoder'>
export type IntArrayKey = Omit<t.TypeOf<typeof IntArrayKey>, 'paramDecoder'>
export type ByteArrayKey = Omit<t.TypeOf<typeof ByteArrayKey>, 'paramDecoder'>
export type LongArrayKey = Omit<t.TypeOf<typeof LongArrayKey>, 'paramDecoder'>
export type ShortArrayKey = Omit<t.TypeOf<typeof ShortArrayKey>, 'paramDecoder'>
export type FloatArrayKey = Omit<t.TypeOf<typeof FloatArrayKey>, 'paramDecoder'>
export type DoubleArrayKey = Omit<t.TypeOf<typeof DoubleArrayKey>, 'paramDecoder'>
export type BooleanKey = Omit<t.TypeOf<typeof BooleanKey>, 'paramDecoder'>
export type UTCTimeKey = Omit<t.TypeOf<typeof UTCTimeKey>, 'paramDecoder'>
export type TAITimeKey = Omit<t.TypeOf<typeof TAITimeKey>, 'paramDecoder'>
// RaDecKey,
// EqCoordKey,
// SolarSystemCoordKey,
// MinorPlanetCoordKey,
// CometCoordKey,
// AltAzCoordKey,
// CoordKey,

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
  IntKey: IntKey,
  LongKey: LongKey,
  ShortKey: ShortKey,
  FloatKey: FloatKey,
  DoubleKey: DoubleKey,
  ByteKey: ByteKey,
  BooleanKey: BooleanKey,
  StringKey: StringKey,
  CharKey: CharKey,
  UTCTimeKey: UTCTimeKey,
  TAITimeKey: TAITimeKey,
  IntArrayKey: IntArrayKey,
  LongArrayKey: LongArrayKey,
  ShortArrayKey: ShortArrayKey,
  FloatArrayKey: FloatArrayKey,
  DoubleArrayKey: DoubleArrayKey,
  ByteArrayKey: ByteArrayKey,
  IntMatrixKey: IntMatrixKey,
  LongMatrixKey: LongMatrixKey,
  ShortMatrixKey: ShortMatrixKey,
  FloatMatrixKey: FloatMatrixKey,
  DoubleMatrixKey: DoubleMatrixKey,
  ByteMatrixKey: ByteMatrixKey,
  StructKey: StructKey,
  ChoiceKey: ChoiceKey
  // RaDecKey: RaDecKey,
  // EqCoordKey: EqCoordKey,
  // SolarSystemCoordKey: SolarSystemCoordKey,
  // MinorPlanetCoordKey: MinorPlanetCoordKey,
  // CometCoordKey: CometCoordKey,
  // AltAzCoordKey: AltAzCoordKey,
  // CoordKey: CoordKey
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
