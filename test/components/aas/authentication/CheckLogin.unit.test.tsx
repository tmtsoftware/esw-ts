import { render } from '@testing-library/react'
import Keycloak from 'keycloak-js'
import * as React from 'react'
import { mocked } from 'ts-jest/utils'
import CheckLogin from '../../../../src/components/aas/authentication/CheckLogin'
import { Provider } from '../../../../src/components/aas/context/AuthContext'
import { mockAuth, mockedKeyCloakInstance } from '../../../helpers/MockHelpers'

jest.mock('keycloak-js')

describe('<CheckLogin />', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const mockFn = mocked(Keycloak, true)
  const keycloakInstance = mockedKeyCloakInstance()
  mockFn.mockReturnValue(keycloakInstance)

  const props = {
    children: <div id="auth">Authentication successful</div>,
    error: <div id="error">Authentication unsuccessful</div>
  }
  const mockLogin = jest.fn()
  const mockLogout = jest.fn()

  test('should render children elements if authentication is true | ESW-330', async () => {
    const auth = mockAuth(true)

    const { queryByText } = render(
      <Provider value={{ auth: auth, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(queryByText('Authentication successful')).toBeTruthy()
    expect(queryByText('Authentication unsuccessful')).toBeFalsy()
  })

  test('should not render children elements if authentication is false', () => {
    const auth = mockAuth(false)

    const { queryByText } = render(
      <Provider value={{ auth: auth, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(queryByText('Authentication successful')).toBeFalsy()
    expect(queryByText('Authentication unsuccessful')).toBeTruthy()
  })

  test('should render CheckLogin if authentication is true', () => {
    const auth = mockAuth(true)

    const { container } = render(
      <Provider value={{ auth: auth, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should not render CheckLogin if authentication is false', () => {
    const auth = mockAuth(false)

    const { container } = render(
      <Provider value={{ auth: auth, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render nothing if CheckLogin if authentication is false and error component is not provided', () => {
    const auth = mockAuth(false)

    const props = {
      children: <div className="auth">Authentication successful</div>,
      error: null
    }

    const { container } = render(
      <Provider value={{ auth: auth, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })
})
