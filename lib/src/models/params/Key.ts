import * as t from 'io-ts'
import { BaseKey } from './BaseKey'
import { ChoiceKeyFactory } from './ChoiceKeyFactory'
import * as C from './Coord'
import { Struct } from './Struct'
import { Units } from './Units'

const ParamBodyDecoder = <T>(valuesDec: t.Type<T, unknown>) =>
  t.type({
    keyName: t.string,
    values: t.array(valuesDec),
    units: Units
  })

const RawKey = <KType extends t.Mixed>(kType: KType) => <KTag extends string>(kTag: KTag) =>
  t.type({
    keyTag: t.literal(kTag),
    keyType: kType,
    paramDecoder: ParamBodyDecoder(kType)
  })

export type KTag<T extends Key> = T['keyTag']
export type KType<T extends Key> = T['keyType']

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

// coord keys
export const RaDecKey = RawKey(C.RaDec)('RaDecKey')
export const EqCoordKey = RawKey(C.EqCoord)('EqCoordKey')
export const SolarSystemCoordKey = RawKey(C.SolarSystemCoord)('SolarSystemCoordKey')
export const MinorPlanetCoordKey = RawKey(C.MinorPlanetCoord)('MinorPlanetCoordKey')
export const CometCoordKey = RawKey(C.CometCoord)('CometCoordKey')
export const AltAzCoordKey = RawKey(C.AltAzCoord)('AltAzCoordKey')
export const CoordKey = RawKey(C.Coord)('CoordKey')

type OmitParamDecoder<T extends t.Any> = Omit<t.TypeOf<T>, 'paramDecoder'>

export type IntKey = OmitParamDecoder<typeof IntKey>
export type LongKey = OmitParamDecoder<typeof LongKey>
export type ShortKey = OmitParamDecoder<typeof ShortKey>
export type FloatKey = OmitParamDecoder<typeof FloatKey>
export type DoubleKey = OmitParamDecoder<typeof DoubleKey>
export type ByteKey = OmitParamDecoder<typeof ByteKey>
export type StringKey = OmitParamDecoder<typeof StringKey>
export type CharKey = OmitParamDecoder<typeof CharKey>
export type StructKey = OmitParamDecoder<typeof StructKey>
export type ChoiceKey = OmitParamDecoder<typeof ChoiceKey>
export type IntMatrixKey = OmitParamDecoder<typeof IntMatrixKey>
export type ByteMatrixKey = OmitParamDecoder<typeof ByteMatrixKey>
export type LongMatrixKey = OmitParamDecoder<typeof LongMatrixKey>
export type ShortMatrixKey = OmitParamDecoder<typeof ShortMatrixKey>
export type FloatMatrixKey = OmitParamDecoder<typeof FloatMatrixKey>
export type DoubleMatrixKey = OmitParamDecoder<typeof DoubleMatrixKey>
export type IntArrayKey = OmitParamDecoder<typeof IntArrayKey>
export type ByteArrayKey = OmitParamDecoder<typeof ByteArrayKey>
export type LongArrayKey = OmitParamDecoder<typeof LongArrayKey>
export type ShortArrayKey = OmitParamDecoder<typeof ShortArrayKey>
export type FloatArrayKey = OmitParamDecoder<typeof FloatArrayKey>
export type DoubleArrayKey = OmitParamDecoder<typeof DoubleArrayKey>
export type BooleanKey = OmitParamDecoder<typeof BooleanKey>
export type UTCTimeKey = OmitParamDecoder<typeof UTCTimeKey>
export type TAITimeKey = OmitParamDecoder<typeof TAITimeKey>
export type RaDecKey = OmitParamDecoder<typeof RaDecKey>
export type EqCoordKey = OmitParamDecoder<typeof EqCoordKey>
export type SolarSystemCoordKey = OmitParamDecoder<typeof SolarSystemCoordKey>
export type MinorPlanetCoordKey = OmitParamDecoder<typeof MinorPlanetCoordKey>
export type CometCoordKey = OmitParamDecoder<typeof CometCoordKey>
export type AltAzCoordKey = OmitParamDecoder<typeof AltAzCoordKey>
export type CoordKey = OmitParamDecoder<typeof CoordKey>

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
  | TAITimeKey
  | RaDecKey
  | EqCoordKey
  | SolarSystemCoordKey
  | MinorPlanetCoordKey
  | CometCoordKey
  | AltAzCoordKey
  | CoordKey

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
  ChoiceKey: ChoiceKey,
  RaDecKey: RaDecKey,
  EqCoordKey: EqCoordKey,
  SolarSystemCoordKey: SolarSystemCoordKey,
  MinorPlanetCoordKey: MinorPlanetCoordKey,
  CometCoordKey: CometCoordKey,
  AltAzCoordKey: AltAzCoordKey,
  CoordKey: CoordKey
}

export const KeyTag = t.keyof(Keys)
export type KeyTag = t.TypeOf<typeof KeyTag>

const keyFactory = <KType extends Key>(keyTag: KType['keyTag'], defaultUnit: Units = 'NoUnits') => (
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
export const raDecKey = keyFactory<RaDecKey>('RaDecKey')
export const eqCoordKey = keyFactory<EqCoordKey>('EqCoordKey')
export const solarSystemCoordKey = keyFactory<SolarSystemCoordKey>('SolarSystemCoordKey')
export const minorPlanetCoordKey = keyFactory<MinorPlanetCoordKey>('MinorPlanetCoordKey')
export const cometCoordKey = keyFactory<CometCoordKey>('CometCoordKey')
export const altAzCoordKey = keyFactory<AltAzCoordKey>('AltAzCoordKey')
export const coordKey = keyFactory<CoordKey>('CoordKey')
