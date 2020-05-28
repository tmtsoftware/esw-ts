import { AlarmKey } from 'clients/alarm'
import { Prefix } from 'models'

describe('Alarm key', () => {
  test('prefix name should not have invalid chars', () => {
    expect(() => new AlarmKey(new Prefix('ESW', 'comp-1'), 'alarm123')).toThrow(Error)
  })

  test('name should not have invalid chars', () => {
    expect(() => new AlarmKey(new Prefix('ESW', 'comp1'), 'alarm-123')).toThrow(Error)
  })
})
