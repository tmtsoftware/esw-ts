import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { Parameter, UnitsDec } from '../../src/models'
import { IntArrayKey, IntKey, Key, StringKey, StructKey } from './../../src/models/params/Key'
import { Struct } from './../../src/models/params/Struct'

const KeyTagDecoder = D.literal('IntKey', 'StringKey', 'IntArrayKey', 'StructKey')

const ParamBodyDecoder = <T extends Key>(valuesDec: D.Decoder<T['KeyType']>) =>
  D.type({
    keyName: D.string,
    values: D.array(valuesDec),
    units: UnitsDec
  })

export const ParameterDecoder: D.Decoder<Parameter<Key>> = pipe(
  D.UnknownRecord,
  D.parse((rec) => {
    const key = Object.keys(rec)[0]
    const body = rec[key]
    return pipe(
      KeyTagDecoder.decode(key),
      E.chain((keyTag) =>
        pipe(
          ParamDecodersMap[keyTag].decode(body),
          E.map((b) => new Parameter(b.keyName, keyTag, b.values, b.units))
        )
      )
    )
  })
)

const StructDecoder: D.Decoder<Struct> = D.type({ paramSet: D.array(ParameterDecoder) })
const ParamDecodersMap = {
  IntKey: ParamBodyDecoder<IntKey>(D.number),
  StringKey: ParamBodyDecoder<StringKey>(D.string),
  IntArrayKey: ParamBodyDecoder<IntArrayKey>(D.array(D.number)),
  StructKey: ParamBodyDecoder<StructKey>(StructDecoder)
}

export const ParamSetDec = D.type({ paramSet: D.array(ParameterDecoder) })
