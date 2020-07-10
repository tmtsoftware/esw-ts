import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { DecodeError } from 'io-ts/lib/DecodeError'
import * as D from 'io-ts/lib/Decoder'
import { FreeSemigroup } from 'io-ts/lib/FreeSemigroup'
import { Parameter, UnitsDec } from '../../src/models'
import {
  IntArrayKey,
  IntKey,
  Key,
  StringKey,
  Struct,
  StructKey
} from './../../src/models/params/Key'

type ErrorD = FreeSemigroup<DecodeError<string>>

const get = <A>(result: E.Either<ErrorD, A>): A =>
  E.getOrElse<ErrorD, A>((err) => {
    throw Error('Right value not present, Error: ' + D.draw(err))
  })(result)

const KeyTagDecoder = D.literal('IntKey', 'StringKey', 'IntArrayKey', 'StructKey')

const ParameterDecoder: D.Decoder<Parameter<Key>> = pipe(
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

const ParamBodyDecoder = <T extends Key>(valuesDec: D.Decoder<T['KeyType']>) =>
  D.type({
    keyName: D.string,
    values: D.array(valuesDec),
    units: UnitsDec
  })

const StructDecoder: D.Decoder<Struct> = D.type({ paramSet: D.array(ParameterDecoder) })
const ParamDecodersMap = {
  IntKey: ParamBodyDecoder<IntKey>(D.number),
  StringKey: ParamBodyDecoder<StringKey>(D.string),
  IntArrayKey: ParamBodyDecoder<IntArrayKey>(D.array(D.number)),
  StructKey: ParamBodyDecoder<StructKey>(StructDecoder)
}

const ParamSetDec = D.type({ paramSet: D.array(ParameterDecoder) })

test('Parameter', () => {
  // input json to be decoded to Parameter class
  const intParam: unknown = {
    IntKey: {
      keyName: 'epoch',
      values: [1, 2, 3],
      units: 'angstrom'
    }
  }

  const intArrayRaw: unknown = {
    IntArrayKey: {
      keyName: 'epoch',
      values: [
        [1, 2],
        [3, 4]
      ],
      units: 'angstrom'
    }
  }

  console.log(get(ParameterDecoder.decode(intParam)))
  console.log(get(ParameterDecoder.decode(intArrayRaw)))
})

test('ParamSet', () => {
  // input json to be decoded to Parameter class
  const paramSet: unknown = {
    paramSet: [
      {
        IntKey: {
          keyName: 'epoch',
          values: [1, 2, 3],
          units: 'angstrom'
        }
      },
      {
        IntArrayKey: {
          keyName: 'epoch',
          values: [
            [1, 2],
            [3, 4]
          ],
          units: 'angstrom'
        }
      }
    ]
  }

  console.log(get(ParamSetDec.decode(paramSet)))
})

test('Struct', () => {
  const raw = {
    StructKey: {
      keyName: 'myStruct',
      values: [
        {
          paramSet: [
            {
              StringKey: {
                keyName: 'ra',
                values: ['12:13:14.1'],
                units: 'NoUnits'
              }
            },
            {
              IntKey: {
                keyName: 'epoch',
                values: [1, 2, 3],
                units: 'angstrom'
              }
            }
          ]
        }
      ],
      units: 'NoUnits'
    }
  }

  console.log(JSON.stringify(get(ParameterDecoder.decode(raw))))
})
