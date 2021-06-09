import { choiceKey, Parameter } from '../../src'

describe('choiceKey', () => {
  test('should allow setting supported choices', () => {
    // this trick allows compile time check for valid choice provided while setting
    const choices = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
    const weekDaysKey = choiceKey('weekDaysKey', choices)
    const weekDayParam = weekDaysKey.set('Mon', 'Wed')
    expect(weekDayParam).toEqual(
      new Parameter('weekDaysKey', 'ChoiceKey', ['Mon', 'Wed'], 'NoUnits')
    )
  })

  test('should allow setting supported choices and units', () => {
    // inlining choices also provides compile time check for valid choice while setting
    const workingsDaysKey = choiceKey('workingsDays', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], 'day')
    const weekDayParam = workingsDaysKey.set('Mon', 'Wed')
    expect(weekDayParam).toEqual(new Parameter('workingsDays', 'ChoiceKey', ['Mon', 'Wed'], 'day'))
  })

  test('should throw error for invalid choice', () => {
    // if choices are not inlined and not marked as const, compiler will allow any arbitrary string to be used while setting
    // hence set method has  require check which restricts this from happening at runtime
    const choices = ['1', '2', '3']
    const weekDaysKey = choiceKey('weekDaysKey', choices)
    expect(() => weekDaysKey.set('4')).toThrow(Error)
  })
})
