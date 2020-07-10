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

const IntParamDec = ParamsDecFactory('IntKey', D.number)
const IntArrayKeyParamDec = ParamsDecFactory('IntArrayKey', D.array(D.number))
const StringParamDec = ParamsDecFactory('StringKey', D.string)

const parseParameter0 = (input: unknown) =>
  pipe(
    ParamsDecoder.decode(input),
    E.chain((result) => {
      const kt = Object.keys(result)[0]
      const final = pipe(
        KeyTagDecoder.decode(kt),
        E.map((kt) => {
          const { keyName, values, units } = result[kt]
          return new Parameter(keyName, kt, values, units)
        })
      )
      return final
    })
  )

const parseParameter = (input: unknown) => get(parseParameter0(input))

const ParameterDecoder: D.Decoder<Parameter<Key>> = {
  decode: parseParameter0
}

const StructDecoder: D.Decoder<Struct> = D.type({ paramSet: D.array(ParameterDecoder) })
const StructKeyDecoder = ParamsDecFactory('StructKey', StructDecoder)

const ParamsDecoder = D.union(IntParamDec, StringParamDec, IntArrayKeyParamDec, StructKeyDecoder)

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
