import * as D from 'io-ts/es6/Decoder'
import * as C from '../decoders/CoordDecoders'
import type { ByteKey, DoubleKey, FloatKey, IntKey, LongKey, ShortKey, Units } from '../models'

import { char, ciLiteral, Decoder } from './Decoder'
import { StructD } from './StructDecoder'
import { UnitsD } from './UnitsDecoder'

type KeyType<L extends string, T> = {
  keyTag: L
  keyType: T
}
// ---------------------------------
// Key, ParameterBody Schema
// ---------------------------------

type ParamDecoder<T> = Decoder<{
  keyName: string
  values: T[]
  units: Units
}>

// ---------------------------------
// Key, ParameterBody Decoders
// ---------------------------------

const ParamBodyDecoder = <T>(valuesDec: Decoder<T>): ParamDecoder<T> =>
  D.struct({
    keyName: D.string,
    values: D.array(valuesDec),
    units: UnitsD
  })

export const paramDecoders: Record<string, ParamDecoder<unknown>> = {}

const mkRawKeyD =
  <KType>(kType: Decoder<KType>) =>
  <KTag extends string>(kTag: KTag): Decoder<KeyType<KTag, KType>> => {
    // populate [key -> decoder] record, used while decoding parameter
    paramDecoders[kTag] = ParamBodyDecoder(kType)

    return D.struct({
      keyTag: ciLiteral(kTag),
      keyType: kType
    })
  }
/* eslint-disable  @typescript-eslint/no-unused-vars */
// Simple Keys
const mkNumberKeyD = mkRawKeyD<number>(D.number)
const IntKeyD: Decoder<IntKey> = mkNumberKeyD('IntKey')
const LongKeyD: Decoder<LongKey> = mkNumberKeyD('LongKey')
const ShortKeyD: Decoder<ShortKey> = mkNumberKeyD('ShortKey')
const FloatKeyD: Decoder<FloatKey> = mkNumberKeyD('FloatKey')
const DoubleKeyD: Decoder<DoubleKey> = mkNumberKeyD('DoubleKey')
const ByteKeyD: Decoder<ByteKey> = mkNumberKeyD('ByteKey')

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

// -----------------------------------------------------------
// Key Literals Decoder, for ex. 'IntKey', 'StringKey' etc.
// -----------------------------------------------------------
const keys = Object.keys(paramDecoders)
export const keyTagDecoder = ciLiteral(keys[0], ...keys.slice(1))
/* eslint-disable  @typescript-eslint/no-unused-vars */
