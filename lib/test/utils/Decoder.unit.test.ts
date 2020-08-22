import { ParameterD } from '../../src/models'
import { char } from '../../src/utils/Decoder'
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
      units: 'angstrom'
    }

    expect(getOrThrow(ParameterD.decode(intParam))).toEqual(expectedIntParam)
  })
})
