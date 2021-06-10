import { AuthContextDefaultState } from '../../../../src/components/aas/context/AuthContext'

describe('<AuthContext />', () => {
  test('should have correct default state | ESW-330', () => {
    expect(AuthContextDefaultState.login()).toBe(undefined)
    expect(AuthContextDefaultState.logout()).toBe(undefined)
    expect(AuthContextDefaultState.auth).toBe(null)
  })
})
