import * as E from 'fp-ts/lib/Either'
import { Either, getOrElse } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { DecodeError } from 'io-ts/lib/DecodeError'
import * as D from 'io-ts/lib/Decoder'
import { FreeSemigroup } from 'io-ts/lib/FreeSemigroup'
import { Parameter, UnitsDec } from '../../src/models'
import { Key, Struct } from './../../src/models/params/Key'

type ErrorD = FreeSemigroup<DecodeError<string>>

const get = <A>(result: Either<ErrorD, A>): A =>
  getOrElse<ErrorD, A>((err) => {
    throw Error('Right value not present, Error: ' + D.draw(err))
  })(result)

const KeyTagDecoder = D.literal('IntKey', 'StringKey', 'IntArrayKey', 'StructKey')

const ParamsDecFactory = <T extends Key>(kt: T['KeyTag'], valuesDec: D.Decoder<T['KeyType']>) =>
  D.type({
    [kt]: D.type({
      keyName: D.string,
      values: D.array(valuesDec),
      units: UnitsDec
    })
  })

const ParameterDecoder: D.Decoder<Parameter<Key>> = {
  decode: (input: unknown) =>
    pipe(
      ParamsDecoder.decode(input),
      E.chain((result) => {
        return pipe(
          KeyTagDecoder.decode(Object.keys(result)[0]),
          E.map((keyTag) => {
            const { keyName, values, units } = result[keyTag]
            return new Parameter(keyName, keyTag, values, units)
          })
        )
      })
    )
}

const IntParamDec = ParamsDecFactory('IntKey', D.number)
const IntArrayKeyParamDec = ParamsDecFactory('IntArrayKey', D.array(D.number))
const StringParamDec = ParamsDecFactory('StringKey', D.string)

const StructDecoder: D.Decoder<Struct> = D.type({ paramSet: D.array(ParameterDecoder) })
const StructParamDecoder = ParamsDecFactory('StructKey', StructDecoder)

const ParamsDecoder = D.union(IntParamDec, StringParamDec, IntArrayKeyParamDec, StructParamDecoder)

const parseParameter = (input: unknown) => get(ParameterDecoder.decode(input))
const ParamSetDec = D.type({ paramSet: D.array(ParamsDecoder) })
const parseParamSet = (input: unknown) => {
  const rawParamSet = get(ParamSetDec.decode(input)).paramSet
  return rawParamSet.map((p) => parseParameter(p))
}

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

  console.log(parseParameter(intParam))
  console.log(parseParameter(intArrayRaw))
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

  console.log(parseParamSet(paramSet))
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

  console.log(JSON.stringify(parseParameter(raw)))
})
