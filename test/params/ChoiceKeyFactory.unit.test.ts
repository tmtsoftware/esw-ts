import { ChoiceKeyFactory } from '../../src/models'

describe('Choice Key factory', () => {
  test('set returns a Parameter', () => {
    const keyFactory = new ChoiceKeyFactory(
      'weekdays',
      'StringKey',
      ['Monday', 'Tuesday'],
      'NoUnits'
    )
    const keyParameter = keyFactory.set('Tuesday')

    const expectedParameter = {
      keyTag: 'StringKey',
      keyName: 'weekdays',
      units: 'NoUnits',
      values: ['Tuesday']
    }
    expect(keyParameter).toEqual(expectedParameter)
  })
})
