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
  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const observeCommand = new Observe(hcdPrefix, 'Observe-1').madd(paramSet)

    expect(observeCommand.size()).toEqual(2)
  })

  test('get | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const observeCommand = new Observe(hcdPrefix, 'Observe-1').madd(paramSet)

    expect(observeCommand.get(intKey('number'))).toEqual(intParam)
  })

  test('add | ESW-380', () => {
    const observeCommand = new Observe(hcdPrefix, 'Observe-1').madd([intParam])

    expect(observeCommand.add(stringParam)).toEqual(
      new Observe(hcdPrefix, 'Observe-1').madd([intParam, stringParam])
    )
  })

  test('madd | ESW-380', () => {
    const observeCommand = new Observe(hcdPrefix, 'Observe-1').madd([intParam])

    expect(observeCommand.madd([stringParam, intArrayParam])).toEqual(
      new Observe(hcdPrefix, 'Observe-1').madd([intParam, stringParam, intArrayParam])
    )
  })

  test('exists | ESW-380', () => {
    const observeCommand = new Observe(hcdPrefix, 'Observe-1').madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    expect(observeCommand.exists(intKey('number'))).toBe(true)
    expect(observeCommand.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const observeCommand = new Observe(hcdPrefix, 'Observe-1').madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    expect(observeCommand.remove(intKey('number'))).toEqual(
      new Observe(hcdPrefix, 'Observe-1').madd([stringParam, intArrayParam])
    )
  })
})

describe('Setup command', () => {
  test('get | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const setupCommand = new Setup(hcdPrefix, 'Setup-1').madd(paramSet)

    expect(setupCommand.get(intKey('number'))).toEqual(intParam)
  })

  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const setupCommand = new Setup(hcdPrefix, 'Setup-1').madd(paramSet)

    expect(setupCommand.size()).toEqual(2)
  })

  test('add | ESW-380', () => {
    const setupCommand = new Setup(hcdPrefix, 'Setup-1').madd([intParam])

    expect(setupCommand.add(stringParam)).toEqual(
      new Setup(hcdPrefix, 'Setup-1').madd([intParam, stringParam])
    )
  })

  test('madd | ESW-380', () => {
    const setupCommand = new Setup(hcdPrefix, 'Setup-1').madd([intParam])

    expect(setupCommand.madd([stringParam, intArrayParam])).toEqual(
      new Setup(hcdPrefix, 'Setup-1').madd([intParam, stringParam, intArrayParam])
    )
  })

  test('exists | ESW-380', () => {
    const setupCommand = new Setup(hcdPrefix, 'Setup-1').madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    expect(setupCommand.exists(intKey('number'))).toBe(true)
    expect(setupCommand.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const setupCommand = new Setup(hcdPrefix, 'Setup-1').madd([
      intParam,
      stringParam,
      intArrayParam
    ])

    expect(setupCommand.remove(intKey('number'))).toEqual(
      new Setup(hcdPrefix, 'Setup-1').madd([stringParam, intArrayParam])
    )
  })
})

describe('Wait command', () => {
  test('get | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const waitCommand = new Wait(hcdPrefix, 'Wait-1').madd(paramSet)

    expect(waitCommand.get(intKey('number'))).toEqual(intParam)
  })

  test('size | ESW-380', () => {
    const paramSet = [intParam, stringParam]

    const waitCommand = new Wait(hcdPrefix, 'Wait-1').madd(paramSet)

    expect(waitCommand.size()).toEqual(2)
  })

  test('add | ESW-380', () => {
    const waitCommand = new Wait(hcdPrefix, 'Wait-1').madd([intParam])

    expect(waitCommand.add(stringParam)).toEqual(
      new Wait(hcdPrefix, 'Wait-1').madd([intParam, stringParam])
    )
  })

  test('madd | ESW-380', () => {
    const waitCommand = new Wait(hcdPrefix, 'Wait-1').madd([intParam])

    expect(waitCommand.madd([stringParam, intArrayParam])).toEqual(
      new Wait(hcdPrefix, 'Wait-1').madd([intParam, stringParam, intArrayParam])
    )
  })

  test('exists | ESW-380', () => {
    const waitCommand = new Wait(hcdPrefix, 'Wait-1').madd([intParam, stringParam, intArrayParam])

    expect(waitCommand.exists(intKey('number'))).toBe(true)
    expect(waitCommand.exists(intKey('number1'))).toBe(false)
  })

  test('remove | ESW-380', () => {
    const waitCommand = new Wait(hcdPrefix, 'Wait-1').madd([intParam, stringParam, intArrayParam])

    expect(waitCommand.remove(intKey('number'))).toEqual(
      new Wait(hcdPrefix, 'Wait-1').madd([stringParam, intArrayParam])
    )
  })
})
