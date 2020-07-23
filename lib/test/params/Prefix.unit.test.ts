import { Prefix, PrefixD } from '../../src/models'
import { getOrThrow } from '../../src/utils/Utils'

describe('Prefix', () => {
  test("cannot have '-' in component name  | ESW-305", () => {
    expect(() => new Prefix('ESW', 'comp-1')).toThrow(Error)
  })

  test('from string  | ESW-305', () => {
    expect( Prefix.fromString('ESW.comp1')).toEqual(new Prefix('ESW', 'comp1'))
  })

  test('throws error when decoding unknown object | ESW-305', () => {
    const invalidString = 'ESWComp1'
    const expectedError = new Error(`cannot decode \"${invalidString}\", should be Subsystem: ${invalidString} is invalid`)

    expect( () => getOrThrow(PrefixD.decode(invalidString))).toThrow(expectedError)
  })
})
