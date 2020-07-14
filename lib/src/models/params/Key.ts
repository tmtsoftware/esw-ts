import * as D from 'io-ts/lib/Decoder'
import { BaseKey } from './BaseKey'
import { ChoiceKeyFactory } from './ChoiceKeyFactory'
import * as C from './Coord'
import { Struct } from './Struct'
import { Units } from './Units'

type ParamDecoder<T> = D.Decoder<{
  keyName: string
  values: T[]
  units: Units
}>
const ParamBodyDecoder = <T>(valuesDec: D.Decoder<T>): ParamDecoder<T> =>
  D.type({
    keyName: D.string,
    values: D.array(valuesDec),
    units: Units
  })

export const Keys: Record<string, ParamDecoder<unknown>> = {}

const RawKey = <KType>(kType: D.Decoder<KType>) => <KTag extends string>(
  kTag: KTag
): D.Decoder<{
  keyTag: KTag
  keyType: KType
}> => {
  Keys[kTag] = ParamBodyDecoder(kType)

  return D.type({
    keyTag: D.literal(kTag),
    keyType: kType
  })
}

export type KTag<T extends Key> = T['keyTag']
export type KType<T extends Key> = T['keyType']

const NumberKey = RawKey<number>(D.number)
export const IntKey = NumberKey('IntKey')
export const LongKey = NumberKey('LongKey')
export const ShortKey = NumberKey('ShortKey')
export const FloatKey = NumberKey('FloatKey')
export const DoubleKey = NumberKey('DoubleKey')
export const ByteKey = NumberKey('ByteKey')

export const BooleanKey = RawKey(D.boolean)('BooleanKey')

const RawStringKey = RawKey(D.string)
export const StringKey = RawStringKey('StringKey')
export const CharKey = RawStringKey('CharKey')

export const UTCTimeKey = RawStringKey('UTCTimeKey') // todo: Maybe in future if we implement Time models, use those here
export const TAITimeKey = RawStringKey('TAITimeKey') // todo: Maybe in future if we implement Time models, use those here

// Array keys
const ArrayNumberKey = RawKey(D.array(D.number))
export const IntArrayKey = ArrayNumberKey('IntArrayKey')
export const LongArrayKey = ArrayNumberKey('LongArrayKey')
export const ShortArrayKey = ArrayNumberKey('ShortArrayKey')
export const FloatArrayKey = ArrayNumberKey('FloatArrayKey')
export const DoubleArrayKey = ArrayNumberKey('DoubleArrayKey')
export const ByteArrayKey = ArrayNumberKey('ByteArrayKey')

// Matrix keys
const MatrixDataNumberKey = RawKey(D.array(D.array(D.number)))
export const IntMatrixKey = MatrixDataNumberKey('IntMatrixKey')
export const LongMatrixKey = MatrixDataNumberKey('LongMatrixKey')
export const ShortMatrixKey = MatrixDataNumberKey('ShortMatrixKey')
export const FloatMatrixKey = MatrixDataNumberKey('FloatMatrixKey')
export const DoubleMatrixKey = MatrixDataNumberKey('DoubleMatrixKey')
export const ByteMatrixKey = MatrixDataNumberKey('ByteMatrixKey')

export const StructKey = RawKey(Struct)('StructKey')

export const ChoiceKey = RawKey(D.string)('ChoiceKey')

// coord keys
export const RaDecKey = RawKey(C.RaDec)('RaDecKey')
export const EqCoordKey = RawKey(C.EqCoord)('EqCoordKey')
export const SolarSystemCoordKey = RawKey(C.SolarSystemCoord)('SolarSystemCoordKey')
export const MinorPlanetCoordKey = RawKey(C.MinorPlanetCoord)('MinorPlanetCoordKey')
export const CometCoordKey = RawKey(C.CometCoord)('CometCoordKey')
export const AltAzCoordKey = RawKey(C.AltAzCoord)('AltAzCoordKey')
export const CoordKey = RawKey(C.Coord)('CoordKey')

export type Key =
  | D.TypeOf<typeof IntKey>
  | D.TypeOf<typeof LongKey>
  | D.TypeOf<typeof ShortKey>
  | D.TypeOf<typeof FloatKey>
  | D.TypeOf<typeof DoubleKey>
  | D.TypeOf<typeof ByteKey>
  | D.TypeOf<typeof StringKey>
  | D.TypeOf<typeof CharKey>
  | D.TypeOf<typeof StructKey>
  | D.TypeOf<typeof ChoiceKey>
  | D.TypeOf<typeof IntMatrixKey>
  | D.TypeOf<typeof ByteMatrixKey>
  | D.TypeOf<typeof LongMatrixKey>
  | D.TypeOf<typeof ShortMatrixKey>
  | D.TypeOf<typeof FloatMatrixKey>
  | D.TypeOf<typeof DoubleMatrixKey>
  | D.TypeOf<typeof IntArrayKey>
  | D.TypeOf<typeof ByteArrayKey>
  | D.TypeOf<typeof LongArrayKey>
  | D.TypeOf<typeof ShortArrayKey>
  | D.TypeOf<typeof FloatArrayKey>
  | D.TypeOf<typeof DoubleArrayKey>
  | D.TypeOf<typeof BooleanKey>
  | D.TypeOf<typeof UTCTimeKey>
  | D.TypeOf<typeof TAITimeKey>
  | D.TypeOf<typeof RaDecKey>
  | D.TypeOf<typeof EqCoordKey>
  | D.TypeOf<typeof SolarSystemCoordKey>
  | D.TypeOf<typeof MinorPlanetCoordKey>
  | D.TypeOf<typeof CometCoordKey>
  | D.TypeOf<typeof AltAzCoordKey>
  | D.TypeOf<typeof CoordKey>

const keyFactory = <KType extends Key>(keyTag: KType['keyTag'], defaultUnit: Units = 'NoUnits') => (
  name: string,
  units: Units = defaultUnit
) => new BaseKey<KType>(name, keyTag, units)

// simple key's
export const intKey = keyFactory('IntKey')
export const longKey = keyFactory('LongKey')
export const shortKey = keyFactory('ShortKey')
export const floatKey = keyFactory('FloatKey')
export const doubleKey = keyFactory('DoubleKey')
export const byteKey = keyFactory('ByteKey')
export const stringKey = keyFactory('StringKey')
export const charKey = keyFactory('CharKey')
export const booleanKey = keyFactory('BooleanKey')

// matrix keys
export const byteMatrixKey = keyFactory('ByteMatrixKey')
export const intMatrixKey = keyFactory('IntMatrixKey')
export const longMatrixKey = keyFactory('LongMatrixKey')
export const shortMatrixKey = keyFactory('ShortMatrixKey')
export const floatMatrixKey = keyFactory('FloatMatrixKey')
export const doubleMatrixKey = keyFactory('DoubleMatrixKey')

// array keys
export const byteArrayKey = keyFactory('ByteArrayKey')
export const intArrayKey = keyFactory('IntArrayKey')
export const longArrayKey = keyFactory('LongArrayKey')
export const shortArrayKey = keyFactory('ShortArrayKey')
export const floatArrayKey = keyFactory('FloatArrayKey')
export const doubleArrayKey = keyFactory('DoubleArrayKey')

// time, choice and struct keys
export const structKey = keyFactory('StructKey')
export const utcTimeKey = keyFactory('UTCTimeKey', 'second')
export const taiTimeKey = keyFactory('TAITimeKey', 'second')

export const choiceKey = (name: string, units: Units = 'NoUnits') =>
  new ChoiceKeyFactory(name, 'ChoiceKey', units)

// co-ord keys
export const raDecKey = keyFactory('RaDecKey')
export const eqCoordKey = keyFactory('EqCoordKey')
export const solarSystemCoordKey = keyFactory('SolarSystemCoordKey')
export const minorPlanetCoordKey = keyFactory('MinorPlanetCoordKey')
export const cometCoordKey = keyFactory('CometCoordKey')
export const altAzCoordKey = keyFactory('AltAzCoordKey')
export const coordKey = keyFactory('CoordKey')

const ks = Object.keys(Keys)
export const KeyTag = D.literal(ks[0], ...ks.slice(1))
