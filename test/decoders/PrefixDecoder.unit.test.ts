import { PrefixD } from '../../src/decoders/PrefixDecoder'
import { getOrThrow } from '../../src/utils/Utils'

describe('PrefixD', () => {
  test('throws error when decoding unknown object | ESW-305', () => {
    const invalidString = 'ESWComp1'
    const expectedError = new Error(
      `cannot decode \"${invalidString}\", should be Subsystem: ${invalidString} is invalid`
    )

    expect(() => getOrThrow(PrefixD.decode(invalidString))).toThrow(expectedError)
  })
})
