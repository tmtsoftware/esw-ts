import { Observe, Prefix, SequenceCommand, Setup, Sequence } from '../../../../src'

const setup = new Setup(Prefix.fromString('ESW.ESW_2'), 'temperature')
const observe = new Observe(Prefix.fromString('ESW.ESW_1'), 'temperature')
const validJson = [observe, setup]
const invalidJson: SequenceCommand = observe

describe('Sequence', () => {
  test('should return commands if proper list of commands is sent | ESW-491', () => {
    const sequence: Sequence = Sequence.from(JSON.parse(JSON.stringify(validJson)))

    expect(sequence).toBeDefined()
    expect(sequence.commands).toHaveLength(2)
    expect(sequence.commands[0]).toEqual(observe)
    expect(sequence.commands[1]).toEqual(setup)
  })

  test('should return error if proper list of commands not sent | ESW-491', () => {
    expect(() => Sequence.from(JSON.parse(JSON.stringify(invalidJson)))).toThrow()
  })
})
