import { AlarmKey } from '../../../../src/clients/alarm'
import { Prefix } from '../../../../src/models'

describe('Alarm key', () => {
  test('prefix name should not have invalid chars | ESW-313', () => {
    expect(() => new AlarmKey(new Prefix('ESW', 'comp-1'), 'alarm123')).toThrow(Error)
  })

  test('name should not have invalid chars | ESW-313', () => {
    expect(() => new AlarmKey(new Prefix('ESW', 'comp1'), 'alarm-123')).toThrow(Error)
  })
})
