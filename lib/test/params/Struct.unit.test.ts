import { intArrayKey, intKey, Key, Parameter, stringKey, Struct } from '../../src/models'

describe('Struct', () => {
  const intParam: Parameter<Key> = intKey('number').set([1, 2, 3])
  const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
  const intArrayParam = intArrayKey('array_key').set([
    [1, 2],
    [3, 4]
  ])

  test('get | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const struct = new Struct().madd(paramSet)

    expect(struct.get(intKey('number'))).toEqual(intParam)
  })

  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const struct = new Struct(paramSet)

    expect(struct.size()).toEqual(2)
  })

  test('add | ESW-380', () => {
    const struct = new Struct([intParam])

    expect(struct.add(stringParam)).toEqual(new Struct([intParam, stringParam]))
  })

  test('madd | ESW-380', () => {
    const struct = new Struct([intParam])

    expect(struct.madd([stringParam, intArrayParam])).toEqual(
      new Struct([intParam, stringParam, intArrayParam])
    )
  })

  test('exists | ESW-380', () => {
    const struct = new Struct([intParam, stringParam, intArrayParam])

    expect(struct.exists(intKey('number'))).toBe(true)
    expect(struct.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const struct = new Struct([intParam, stringParam, intArrayParam])

    expect(struct.remove(intKey('number'))).toEqual(new Struct([stringParam, intArrayParam]))
  })
})
