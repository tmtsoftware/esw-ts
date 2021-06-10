import { intArrayKey, intKey, Key, Parameter, Result, stringKey } from '../../src/models'

describe('Result', () => {
  const intParam: Parameter<Key> = intKey('number').set([1, 2, 3])
  const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
  const intArrayParam = intArrayKey('array_key').set([
    [1, 2],
    [3, 4]
  ])

  test('create | ESW-380', () => {
    const result = new Result().add(intParam)

    const expectedResult = new Result([intParam]).madd([stringParam, intArrayParam])
    expect(result.create([intParam, stringParam, intArrayParam])).toEqual(expectedResult)
  })
})
