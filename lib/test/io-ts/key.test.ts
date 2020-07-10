import * as E from 'fp-ts/lib/Either'
import { DecodeError } from 'io-ts/lib/DecodeError'
import * as D from 'io-ts/lib/Decoder'
import { FreeSemigroup } from 'io-ts/lib/FreeSemigroup'
import { ParameterV, ParamSetV } from '../../src/models'
import { ParameterDecoder, ParamSetDec } from './Decoder'

type ErrorD = FreeSemigroup<DecodeError<string>>

const get = <A>(result: E.Either<ErrorD, A>): A =>
  E.getOrElse<ErrorD, A>((err) => {
    throw Error('Error: ' + D.draw(err))
  })(result)

describe('io-ts', () => {
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
    console.log(ParameterV.decode(intParam))
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
    console.log(ParamSetV.decode(paramSet))
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
    console.log(JSON.stringify(ParameterV.decode(raw)))
  })
})
