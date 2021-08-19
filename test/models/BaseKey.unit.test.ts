import { BaseKey, Key, Units, Parameter } from '../../src/models'

describe('Base Key', () => {
  test('should return parameter on setting values', () => {
    const key: BaseKey<Key> = new BaseKey('prime numbers', 'IntKey', Units.NoUnits)

    const keyParameter: Parameter<Key> = key.set([1, 2, 3])

    expect(keyParameter).toEqual({
      keyName: 'prime numbers',
      keyTag: 'IntKey',
      units: Units.NoUnits,
      values: [1, 2, 3]
    })
  })
})
