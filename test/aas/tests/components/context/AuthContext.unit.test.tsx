import { AuthContextDefaultState } from '../../../../../src/aas/components/context/AuthContext'

describe('<AuthContext />', () => {
  test('should have correct default state', () => {
    expect(AuthContextDefaultState.login()).toBe(undefined)
    expect(AuthContextDefaultState.logout()).toBe(undefined)
    expect(AuthContextDefaultState.auth).toBe(null)
  })
})
