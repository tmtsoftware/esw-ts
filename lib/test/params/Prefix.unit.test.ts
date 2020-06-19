import { Prefix } from '../../src/models'

describe('Prefix', () => {
  test("cannot have '-' in component name  | ESW-305", () => {
    expect(() => new Prefix('ESW', 'comp-1')).toThrow(Error)
  })
})
