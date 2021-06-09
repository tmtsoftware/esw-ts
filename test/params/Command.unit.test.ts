import {
  intArrayKey,
  intKey,
  Key,
  Observe,
  Parameter,
  Prefix,
  Setup,
  stringKey,
  Wait
} from '../../src/models'

const intParam: Parameter<Key> = intKey('number').set([5, 2, 3])
const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
const intArrayParam = intArrayKey('array_key').set([
  [1, 2],
  [3, 4]
])
const hcdPrefix = new Prefix('IRIS', 'testHcd')

describe('Observe command', () => {
  test('create | ESW-380', () => {
    const observeCommand = new Observe(hcdPrefix, 'Observe-1').add(intParam)

    expect(observeCommand.create([stringParam, intArrayParam])).toEqual(
      new Observe(hcdPrefix, 'Observe-1').madd([stringParam, intArrayParam])
    )
  })
})

describe('Setup command', () => {
  test('create | ESW-380', () => {
    const setupCommand = new Setup(hcdPrefix, 'Setup-1').add(intParam)

    expect(setupCommand.create([intParam, stringParam, intArrayParam])).toEqual(
      new Setup(hcdPrefix, 'Setup-1').madd([intParam, stringParam, intArrayParam])
    )
  })
})

describe('Wait command', () => {
  test('create | ESW-380', () => {
    const waitCommand = new Wait(hcdPrefix, 'Wait-1').add(intParam)

    expect(waitCommand.create([stringParam, intArrayParam])).toEqual(
      new Wait(hcdPrefix, 'Wait-1').madd([stringParam, intArrayParam])
    )
  })
})
