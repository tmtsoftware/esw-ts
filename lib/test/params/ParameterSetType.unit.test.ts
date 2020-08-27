import { intArrayKey, intKey, Key, Parameter, stringKey } from '../../src/models'
import { ParameterSetType } from '../../src/models/params/ParameterSetType'

class ParameterSetTypeTest extends ParameterSetType<ParameterSetTypeTest> {
  constructor(readonly paramSet: Parameter<Key>[]) {
    super()
  }

  create(data: Parameter<Key>[]): ParameterSetTypeTest {
    return new ParameterSetTypeTest(data)
  }
}

describe('ParameterSetType', () => {
  const intParam: Parameter<Key> = intKey('number').set([1, 2, 3])
  const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
  const intArrayParam = intArrayKey('array_key').set([[1, 2], 3, 4])

  test('get | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const parameterSetType = new ParameterSetTypeTest(paramSet)

    expect(parameterSetType.get(intKey('number'))).toEqual(intParam)
  })

  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const parameterSetType = new ParameterSetTypeTest(paramSet)

    expect(parameterSetType.size()).toEqual(2)
  })

  test('add | ESW-380', () => {
    const parameterSetType = new ParameterSetTypeTest([intParam])

    expect(parameterSetType.add(stringParam)).toEqual(
      new ParameterSetTypeTest([intParam, stringParam])
    )
  })

  test('madd | ESW-380', () => {
    const parameterSetType = new ParameterSetTypeTest([intParam])

    expect(parameterSetType.madd([stringParam, intArrayParam])).toEqual(
      new ParameterSetTypeTest([intParam, stringParam, intArrayParam])
    )
  })

  test('exists | ESW-380', () => {
    const parameterSetType = new ParameterSetTypeTest([intParam, stringParam, intArrayParam])

    expect(parameterSetType.exists(intKey('number'))).toBe(true)
    expect(parameterSetType.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const parameterSetType = new ParameterSetTypeTest([intParam, stringParam, intArrayParam])

    expect(parameterSetType.remove(intKey('number'))).toEqual(
      new ParameterSetTypeTest([stringParam, intArrayParam])
    )
  })
})
