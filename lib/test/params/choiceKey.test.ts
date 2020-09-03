import { choiceKey, makeChoices, Parameter } from '../../src'

describe('choiceKey', () => {
  test('should allow setting supported choices', () => {
    const weekDaysChoices = makeChoices('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat')
    const weekDaysKey = choiceKey('weekDaysKey', weekDaysChoices)

    const weekDayParam = weekDaysKey.set('Mon', 'Wed')

    expect(weekDayParam).toEqual(
      new Parameter('weekDaysKey', 'ChoiceKey', ['Mon', 'Wed'], 'NoUnits')
    )
  })
})
