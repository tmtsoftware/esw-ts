import { intArrayKey, intKey, Key, Parameter, Result, stringKey } from '../../src/models'

describe('Result', () => {
  const intParam: Parameter<Key> = intKey('number').set([1, 2, 3])
  const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
  const intArrayParam = intArrayKey('array_key').set([[1, 2], 3, 4])

  test('get | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const result = new Result().madd(paramSet)

    expect(result.get(intKey('number'))).toEqual(intParam)
  })

  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const result = new Result(paramSet)

    expect(result.size()).toEqual(2)
  })

  test('add | ESW-380', () => {
    const result = new Result([intParam])

    expect(result.add(stringParam)).toEqual(new Result([intParam, stringParam]))
  })

  test('madd | ESW-380', () => {
    const result = new Result([intParam])

    expect(result.madd([stringParam, intArrayParam])).toEqual(
      new Result([intParam, stringParam, intArrayParam])
    )
  })

  test('exists | ESW-380', () => {
    const result = new Result([intParam, stringParam, intArrayParam])

    expect(result.exists(intKey('number'))).toBe(true)
    expect(result.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const result = new Result([intParam, stringParam, intArrayParam])

    expect(result.remove(intKey('number'))).toEqual(new Result([stringParam, intArrayParam]))
  })
})
