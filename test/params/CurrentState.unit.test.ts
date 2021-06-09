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
  test('create | ESW-380', () => {
    const paramSet = [intParam, stringParam]
    const currentState = new CurrentState(hcdPrefix, 'CurrentState-1').madd(paramSet)
    const data = [intParam, stringParam, intArrayParam]

    const expectedCurrentState = new CurrentState(hcdPrefix, 'CurrentState-1').madd(data)
    expect(currentState.create(data)).toEqual(expectedCurrentState)
  })
})
