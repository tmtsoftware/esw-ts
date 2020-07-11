import { ParameterV, Struct } from '../../src/models'

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

    const intArrayParam: unknown = {
      IntArrayKey: {
        keyName: 'epoch',
        values: [
          [1, 2],
          [3, 4]
        ],
        units: 'angstrom'
      }
    }

    console.log(ParameterV.decode(intParam))
    console.log(ParameterV.decode(intArrayParam))
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

    console.log(Struct.decode(paramSet))
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

    console.log(JSON.stringify(ParameterV.decode(raw)))
  })
})
