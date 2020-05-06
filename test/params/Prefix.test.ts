import { Prefix } from 'models'

describe('Prefix', () => {
  test("cannot have '-' in component name", () => {
    expect(() => new Prefix('ESW', 'comp-1')).toThrow(Error)
  })
})
