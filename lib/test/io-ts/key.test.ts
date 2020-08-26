import { isRight } from 'fp-ts/lib/Either'
import { CurrentStateD, ParameterD, Struct, SubmitResponse } from '../../src/models'
import { getOrThrow } from '../../src/utils/Utils'

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

    console.log(ParameterD.decode(intParam))
    console.log(ParameterD.decode(intArrayParam))
  })

  test('ParamSet', () => {
    // input json to be decoded to Parameter class
    const paramSet: unknown = {
      paramSet: [
        {
          LongKey: {
            keyName: 'LongKey',
            values: [50, 60],
            units: 'NoUnits'
          }
        },
        {
          RaDecKey: {
            keyName: 'RaDecKey',
            values: [
              {
                ra: 7.3,
                dec: 12.1
              }
            ],
            units: 'NoUnits'
          }
        },
        {
          FloatKey: {
            keyName: 'FloatKey',
            values: [90, 100],
            units: 'NoUnits'
          }
        },
        {
          StructKey: {
            keyName: 'StructKey',
            values: [
              {
                paramSet: [
                  {
                    BooleanKey: {
                      keyName: 'BooleanKey',
                      values: [true, false],
                      units: 'NoUnits'
                    }
                  },
                  {
                    ByteKey: {
                      keyName: 'ByteKey',
                      values: [10, 20],
                      units: 'NoUnits'
                    }
                  }
                ]
              }
            ],
            units: 'NoUnits'
          }
        },
        {
          IntArrayKey: {
            keyName: 'IntArrayKey',
            values: [[7, 8]],
            units: 'NoUnits'
          }
        },
        {
          IntMatrixKey: {
            keyName: 'IntMatrix',
            values: [
              [
                [12, 13],
                [14, 15]
              ]
            ],
            units: 'NoUnits'
          }
        },
        {
          LongArrayKey: {
            keyName: 'LongArrayKey',
            values: [[5, 6]],
            units: 'NoUnits'
          }
        },
        {
          ShortKey: {
            keyName: 'ShortKey',
            values: [30, 40],
            units: 'NoUnits'
          }
        },
        {
          LongMatrixKey: {
            keyName: 'LongMatrix',
            values: [
              [
                [8, 9],
                [10, 11]
              ]
            ],
            units: 'NoUnits'
          }
        },
        {
          ByteMatrixKey: {
            keyName: 'ByteMatrix',
            values: [
              [
                [1, 2],
                [3, 4]
              ]
            ],
            units: 'NoUnits'
          }
        },
        {
          ShortArrayKey: {
            keyName: 'ShortArrayKey',
            values: [[3, 4]],
            units: 'NoUnits'
          }
        },
        {
          CoordKey: {
            keyName: 'CoordKey',
            values: [
              {
                _type: 'EqCoord',
                tag: 'BASE',
                ra: 659912250000,
                dec: -109892300000,
                frame: 'ICRS',
                catalogName: 'none',
                pm: {
                  pmx: 0.5,
                  pmy: 2.33
                }
              },
              {
                _type: 'SolarSystemCoord',
                tag: 'BASE',
                body: 'Venus'
              },
              {
                _type: 'MinorPlanetCoord',
                tag: 'GUIDER1',
                epoch: 2000,
                inclination: 324000000000,
                longAscendingNode: 7200000000,
                argOfPerihelion: 360000000000,
                meanDistance: 1.4,
                eccentricity: 0.234,
                meanAnomaly: 792000000000
              },
              {
                _type: 'CometCoord',
                tag: 'BASE',
                epochOfPerihelion: 2000,
                inclination: 324000000000,
                longAscendingNode: 7200000000,
                argOfPerihelion: 360000000000,
                perihelionDistance: 1.4,
                eccentricity: 0.234
              },
              {
                _type: 'AltAzCoord',
                tag: 'BASE',
                alt: 1083600000000,
                az: 153000000000
              }
            ],
            units: 'NoUnits'
          }
        },
        {
          ByteKey: {
            keyName: 'ByteKey',
            values: [10, 20],
            units: 'NoUnits'
          }
        },
        {
          DoubleKey: {
            keyName: 'DoubleKey',
            values: [110, 120],
            units: 'NoUnits'
          }
        },
        {
          DoubleArrayKey: {
            keyName: 'DoubleArrayKey',
            values: [[11, 12]],
            units: 'NoUnits'
          }
        },
        {
          DoubleMatrixKey: {
            keyName: 'DoubleMatrix',
            values: [
              [
                [20, 21],
                [22, 23]
              ]
            ],
            units: 'NoUnits'
          }
        },
        {
          ByteArrayKey: {
            keyName: 'ByteArrayKey',
            values: [[1, 2]],
            units: 'NoUnits'
          }
        },
        {
          CharKey: {
            keyName: 'CharKey',
            values: ['A', 'B'],
            units: 'NoUnits'
          }
        },
        {
          IntKey: {
            keyName: 'IntKey',
            values: [70, 80],
            units: 'NoUnits'
          }
        },
        {
          UTCTimeKey: {
            keyName: 'UTCTimeKey',
            values: ['1970-01-01T00:00:00Z', '2017-09-04T19:00:00.123456789Z'],
            units: 'second'
          }
        },
        {
          ChoiceKey: {
            keyName: 'ChoiceKey',
            values: ['First', 'Second'],
            units: 'NoUnits'
          }
        },
        {
          FloatArrayKey: {
            keyName: 'FloatArrayKey',
            values: [[9, 10]],
            units: 'NoUnits'
          }
        },
        {
          StringKey: {
            keyName: 'StringKey',
            values: ['Str1', 'Str2'],
            units: 'NoUnits'
          }
        },
        {
          BooleanKey: {
            keyName: 'BooleanKey',
            values: [true, false],
            units: 'NoUnits'
          }
        },
        {
          TAITimeKey: {
            keyName: 'TAITimeKey',
            values: ['1970-01-01T00:00:00Z', '2017-09-04T19:00:00.123456789Z'],
            units: 'second'
          }
        },
        {
          ShortMatrixKey: {
            keyName: 'ShortMatrix',
            values: [
              [
                [4, 5],
                [6, 7]
              ]
            ],
            units: 'NoUnits'
          }
        },
        {
          FloatMatrixKey: {
            keyName: 'FloatMatrix',
            values: [
              [
                [16, 17],
                [18, 19]
              ]
            ],
            units: 'NoUnits'
          }
        }
      ]
    }

    console.log(JSON.stringify(Struct.decode(paramSet)))
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

    console.log(JSON.stringify(ParameterD.decode(raw)))
  })

  test('CurrentState', () => {
    const currentState = {
      _type: 'CurrentState',
      prefix: 'WFOS.blue.filter',
      stateName: 'testStateName',
      paramSet: [
        {
          IntArrayKey: {
            keyName: 'intArrayKey',
            values: [
              [1, 2, 3, 4, 5],
              [10, 20, 30, 40, 50]
            ],
            units: 'meter'
          }
        },
        {
          UTCTimeKey: {
            keyName: 'utcTimeKey',
            values: ['1970-01-01T00:00:00Z', '2017-09-04T16:28:00.123456789Z'],
            units: 'second'
          }
        }
      ]
    }

    const cs = CurrentStateD.decode(currentState)
    if (isRight(cs)) {
      const ps = cs.right.paramSet
      const ia = ps.find((p) => p.keyName == 'intArrayKey')
      if (ia) {
        expect(ia.values).toStrictEqual([
          [1, 2, 3, 4, 5],
          [10, 20, 30, 40, 50]
        ])
        console.log('----- MATCHED ------')
      }
    }
    console.log(JSON.stringify(cs))
  })

  test('SubmitResponse', () => {
    const submitResponse = {
      _type: 'Completed',
      runId: '71d9b2b6-7ae9-491d-8471-bb73d97412bc',
      result: {
        paramSet: [
          {
            StructKey: {
              keyName: 'structs',
              values: [
                {
                  paramSet: [
                    {
                      IntKey: {
                        keyName: 'encoder',
                        values: [100],
                        units: 'NoUnits'
                      }
                    },
                    {
                      IntArrayKey: {
                        keyName: 'filter',
                        values: [
                          [1, 2, 3, 4, 5],
                          [10, 20, 30, 40, 50]
                        ],
                        units: 'NoUnits'
                      }
                    }
                  ]
                }
              ],
              units: 'NoUnits'
            }
          },
          {
            IntArrayKey: {
              keyName: 'filter',
              values: [
                [1, 2, 3, 4, 5],
                [10, 20, 30, 40, 50]
              ],
              units: 'NoUnits'
            }
          },
          {
            IntMatrixKey: {
              keyName: 'matrix',
              values: [
                [
                  [1, 2, 3, 4, 5],
                  [10, 20, 30, 40, 50]
                ]
              ],
              units: 'NoUnits'
            }
          },
          {
            ChoiceKey: {
              keyName: 'mode-reset',
              values: ['c'],
              units: 'NoUnits'
            }
          },
          {
            UTCTimeKey: {
              keyName: 'utcTimeKey',
              values: ['2017-09-04T16:28:00.123456789Z'],
              units: 'second'
            }
          },
          {
            RaDecKey: {
              keyName: 'raDecKey',
              values: [
                {
                  ra: 100,
                  dec: 100
                }
              ],
              units: 'NoUnits'
            }
          },
          {
            CometCoordKey: {
              keyName: "halley's",
              values: [
                {
                  _type: 'CometCoord',
                  tag: 'BASE',
                  epochOfPerihelion: 2000,
                  inclination: 90,
                  longAscendingNode: 2,
                  argOfPerihelion: 100,
                  perihelionDistance: 1.4,
                  eccentricity: 0.234
                }
              ],
              units: 'NoUnits'
            }
          },
          {
            IntKey: {
              keyName: 'encoder',
              values: [100],
              units: 'NoUnits'
            }
          }
        ]
      }
    }

    console.log(getOrThrow(SubmitResponse.decode(submitResponse)))
  })
})
