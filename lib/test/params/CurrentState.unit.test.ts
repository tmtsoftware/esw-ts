import {
  CurrentState,
  intArrayKey,
  intKey,
  Key,
  Parameter,
  Prefix,
  stringKey
} from '../../src/models'

const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
const intParam: Parameter<Key> = intKey('number').set([1, 2, 3])
const intArrayParam = intArrayKey('array_key').set([
  [1, 2],
  [3, 4]
])
const hcdPrefix = new Prefix('IRIS', 'testHcd')

describe('CurrentState', () => {
  test('get | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const currentState = new CurrentState(hcdPrefix, 'CurrentState-1').madd(paramSet)

    expect(currentState.get(intKey('number'))).toEqual(intParam)
  })

  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const currentState = new CurrentState(hcdPrefix, 'CurrentState-1').madd(paramSet)

    expect(currentState.size()).toEqual(2)
  })

  test('add | ESW-380', () => {
    const currentState = new CurrentState(hcdPrefix, 'CurrentState-1').madd([intParam])

    expect(currentState.add(stringParam)).toEqual(
      new CurrentState(hcdPrefix, 'CurrentState-1').madd([intParam, stringParam])
    )
  })

  test('madd | ESW-380', () => {
    const currentState = new CurrentState(hcdPrefix, 'CurrentState-1').madd([intParam])

    expect(currentState.madd([stringParam, intArrayParam])).toEqual(
      new CurrentState(hcdPrefix, 'CurrentState-1').madd([intParam, stringParam, intArrayParam])
    )
  })

  test('exists | ESW-380', () => {
    const currentState = new CurrentState(hcdPrefix, 'CurrentState-1').madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    expect(currentState.exists(intKey('number'))).toBe(true)
    expect(currentState.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const currentState = new CurrentState(hcdPrefix, 'CurrentState-1').madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    expect(currentState.remove(intKey('number'))).toEqual(
      new CurrentState(hcdPrefix, 'CurrentState-1').madd([stringParam, intArrayParam])
    )
  })
})
