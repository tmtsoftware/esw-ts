import { intArrayKey, intKey, Key, Parameter, stringKey } from '../../src/models'
import { ParameterSetType } from '../../src/models/params/ParameterSetType'

class ParameterSetTypeTest extends ParameterSetType<ParameterSetTypeTest> {
  constructor(readonly paramSet: Parameter<Key>[]) {
    super()
  }

  create = jest.fn() as jest.MockedFunction<(data: Parameter<Key>[]) => ParameterSetTypeTest>
}

describe('ParameterSetType', () => {
  const intParam: Parameter<Key> = intKey('number').set([1, 2, 3])
  const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
  const intArrayParam = intArrayKey('array_key').set([
    [1, 2],
    [3, 4]
  ])

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
    const expectedParameterSet = [intParam, stringParam]
    const parameterSetType = new ParameterSetTypeTest([intParam])
    parameterSetType.create.mockReturnValue(new ParameterSetTypeTest(expectedParameterSet))

    const actualParameterSet: ParameterSetTypeTest = parameterSetType.add(stringParam)
    expect(actualParameterSet.paramSet).toEqual(expectedParameterSet)
    expect(parameterSetType.create).toBeCalledWith(expectedParameterSet)
  })

  test('madd | ESW-380', () => {
    const expectedParameterSet = [intParam, stringParam, intArrayParam]
    const parameterSetType = new ParameterSetTypeTest([intParam])

    parameterSetType.create.mockReturnValueOnce(new ParameterSetTypeTest([intParam, stringParam]))
    parameterSetType.create.mockReturnValueOnce(new ParameterSetTypeTest(expectedParameterSet))

    const actualParameterSet: ParameterSetTypeTest = parameterSetType.madd([
      stringParam,
      intArrayParam
    ])

    expect(actualParameterSet.paramSet).toEqual(expectedParameterSet)
    expect(parameterSetType.create).toBeCalledTimes(2)
    expect(parameterSetType.create).toBeCalledWith([intParam, stringParam])
    expect(parameterSetType.create).toBeCalledWith(expectedParameterSet)
  })

  test('exists | ESW-380', () => {
    const parameterSetType = new ParameterSetTypeTest([intParam, stringParam, intArrayParam])

    expect(parameterSetType.exists(intKey('number'))).toBe(true)
    expect(parameterSetType.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const expectedParameterSet = [stringParam, intArrayParam]
    const parameterSetType = new ParameterSetTypeTest([intParam, stringParam, intArrayParam])

    parameterSetType.create.mockReturnValueOnce(new ParameterSetTypeTest(expectedParameterSet))

    const actualParameterSet: ParameterSetTypeTest = parameterSetType.remove(intKey('number'))
    expect(actualParameterSet.paramSet).toEqual(expectedParameterSet)
    expect(parameterSetType.create).toBeCalledWith(expectedParameterSet)
  })
})
