import { TAITime, taiTimeKey, Units, UTCTime, utcTimeKey } from '../../src'
import { char } from '../../src/decoders/Decoder'
import { ParameterD } from '../../src/decoders/ParameterDecoder'
import { getOrThrow } from '../../src/utils/Utils'

describe('Decode', () => {
  test('char', () => {
    expect(getOrThrow(char.decode('a'))).toEqual('a')
  })

  test('should throw Decode error when json string length is greater than 1', () => {
    expect(() => getOrThrow(char.decode('ab'))).toThrow('cannot decode "ab", should be single char')
  })

  test('object', () => {
    // input json to be decoded to Parameter class
    const intParam: unknown = {
      IntKey: {
        keyName: 'epoch',
        values: [1, 2, 3],
        units: 'angstrom'
      }
    }

    const expectedIntParam = {
      keyTag: 'IntKey',
      keyName: 'epoch',
      values: [1, 2, 3],
      units: Units.angstrom
    }

    expect(getOrThrow(ParameterD.decode(intParam))).toEqual(expectedIntParam)
  })

  test('Time models in parameter | ESW-542', () => {
    const utcTime = UTCTime.now()
    const utcTimeParam: unknown = {
      UTCTimeKey: {
        keyName: 'utcTime',
        values: [utcTime.toJSON()],
        units: 'UTC'
      }
    }
    const expectedTimeParam = utcTimeKey('utcTime').set([utcTime])
    expect(getOrThrow(ParameterD.decode(utcTimeParam))).toEqual(expectedTimeParam)

    const taiTime = TAITime.now()
    const taiTimeParam: unknown = {
      TAITimeKey: {
        keyName: 'taiTime',
        values: [taiTime.toJSON()],
        units: 'tai'
      }
    }
    const expectedTAITimeParam = taiTimeKey('taiTime').set([taiTime])
    expect(getOrThrow(ParameterD.decode(taiTimeParam))).toEqual(expectedTAITimeParam)
  })
})
