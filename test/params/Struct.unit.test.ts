import { intArrayKey, intKey, Key, Parameter, stringKey, Struct } from '../../src/models'

describe('Struct', () => {
  const intParam: Parameter<Key> = intKey('number').set([1, 2, 3])
  const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
  const intArrayParam = intArrayKey('array_key').set([
    [1, 2],
    [3, 4]
  ])

  test('create | ESW-380', () => {
    const struct = new Struct().add(intParam)

    const expectedStruct = new Struct([intParam]).madd([stringParam, intArrayParam])
    expect(struct.create([intParam, stringParam, intArrayParam])).toEqual(expectedStruct)
  })
})
