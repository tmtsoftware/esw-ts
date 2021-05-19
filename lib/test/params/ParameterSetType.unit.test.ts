import { choiceKey, intArrayKey, intKey, Key, Parameter, stringKey } from '../../src/models'
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
  const rgbKey = choiceKey('RGB', ['Red', 'Green', 'Blue'])
  const rgbParam = rgbKey.set('Green')
  const intArrayParam = intArrayKey('array_key').set([
    [1, 2],
    [3, 4]
  ])

  test('get should return parameter when present | ESW-380', () => {
    const paramSet = [intParam, stringParam, rgbParam]

    const parameterSetType = new ParameterSetTypeTest(paramSet)

    expect(parameterSetType.get(intKey('number'))).toEqual(intParam)
    expect(parameterSetType.get(rgbKey)).toEqual(rgbParam)
  })

  test('get should return undefined when not present | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const parameterSetType = new ParameterSetTypeTest(paramSet)

    expect(parameterSetType.get(intKey('string'))).toEqual(undefined)
    expect(parameterSetType.get(stringKey('number'))).toEqual(undefined)
  })

  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const parameterSetType = new ParameterSetTypeTest(paramSet)

    expect(parameterSetType.size()).toEqual(2)
  })

  test('add should add parameter when same key does not exist | ESW-380', () => {
    const expectedParameterSet = [intParam, stringParam]
    const parameterSetType = new ParameterSetTypeTest([intParam])
    parameterSetType.create.mockReturnValue(new ParameterSetTypeTest(expectedParameterSet))

    const actualParameterSet: ParameterSetTypeTest = parameterSetType.add(stringParam)
    expect(actualParameterSet.paramSet).toEqual(expectedParameterSet)
    expect(parameterSetType.create).toBeCalledWith(expectedParameterSet)
  })

  test('add should replace parameter when same key exists | ESW-380', () => {
    const stringParam1: Parameter<Key> = stringKey('string').set(['abc', 'def'])
    const stringParam2: Parameter<Key> = stringKey('string').set(['def', 'ghi'])
    const expectedParameterSet = [intParam, stringParam2]
    const parameterSetType = new ParameterSetTypeTest([intParam, stringParam1])
    parameterSetType.create.mockReturnValue(new ParameterSetTypeTest(expectedParameterSet))

    const actualParameterSet: ParameterSetTypeTest = parameterSetType.add(stringParam2)
    expect(actualParameterSet.paramSet).toEqual(expectedParameterSet)
    expect(parameterSetType.create).toBeCalledWith(expectedParameterSet)
  })

  test('madd should add parameters when there is no overlap of keys | ESW-380', () => {
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
    expect(parameterSetType.create).toHaveBeenNthCalledWith(1, [intParam, stringParam])
    expect(parameterSetType.create).toHaveBeenNthCalledWith(2, expectedParameterSet)
  })

  test('madd should replace parameters when there is overlap of keys | ESW-380', () => {
    const stringParam1: Parameter<Key> = stringKey('string').set(['abc', 'def'])
    const stringParam2: Parameter<Key> = stringKey('string').set(['def', 'ghi'])
    const initialParameterSet = [intParam, stringParam1]
    const expectedParameterSet = [intParam, stringParam2, intArrayParam]

    const parameterSetType = new ParameterSetTypeTest(initialParameterSet)

    parameterSetType.create.mockReturnValueOnce(new ParameterSetTypeTest([intParam, stringParam2]))
    parameterSetType.create.mockReturnValueOnce(new ParameterSetTypeTest(expectedParameterSet))

    const actualParameterSet: ParameterSetTypeTest = parameterSetType.madd([
      stringParam2,
      intArrayParam
    ])

    expect(actualParameterSet.paramSet).toEqual(expectedParameterSet)
    expect(parameterSetType.create).toBeCalledTimes(2)
    expect(parameterSetType.create).toHaveBeenNthCalledWith(1, [intParam, stringParam2])
    expect(parameterSetType.create).toHaveBeenNthCalledWith(2, expectedParameterSet)
  })

  test('exists should return true if parameter with given key exists | ESW-380', () => {
    const parameterSetType = new ParameterSetTypeTest([
      intParam,
      stringParam,
      intArrayParam,
      rgbParam
    ])

    expect(parameterSetType.exists(intKey('number'))).toBe(true)
    expect(parameterSetType.exists(rgbKey)).toBe(true)
  })

  test('exists should return false if parameter with given key does not exists | ESW-380', () => {
    const parameterSetType = new ParameterSetTypeTest([intParam, stringParam, intArrayParam])

    expect(parameterSetType.exists(intKey('number1'))).toBe(false)
    expect(parameterSetType.exists(stringKey('number'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const expectedParameterSet = [stringParam, intArrayParam]
    const parameterSetType = new ParameterSetTypeTest([intParam, stringParam, intArrayParam])

    parameterSetType.create.mockReturnValueOnce(new ParameterSetTypeTest(expectedParameterSet))

    const actualParameterSet: ParameterSetTypeTest = parameterSetType.remove(intKey('number'))
    expect(actualParameterSet.paramSet).toEqual(expectedParameterSet)
    expect(parameterSetType.create).toBeCalledWith(expectedParameterSet)
  })

  test('remove - choiceKey | ESW-380', () => {
    const expectedParameterSet = [stringParam, intArrayParam]
    const parameterSetType = new ParameterSetTypeTest([rgbParam, stringParam, intArrayParam])

    parameterSetType.create.mockReturnValueOnce(new ParameterSetTypeTest(expectedParameterSet))

    const actualParameterSet: ParameterSetTypeTest = parameterSetType.remove(rgbKey)
    expect(actualParameterSet.paramSet).toEqual(expectedParameterSet)
    expect(parameterSetType.create).toBeCalledWith(expectedParameterSet)
  })
})
