import * as React from 'react'
import { render } from '@testing-library/react'
import CheckLogin from '../../../../../src/aas/components/authentication/CheckLogin'
import { mocked } from 'ts-jest/utils'
import Keycloak, { KeycloakResourceAccess, KeycloakRoles, KeycloakTokenParsed } from 'keycloak-js'
import { mockedKeyCloakInstance } from '../../../../utils/MockHelpers'
import { Auth } from '../../../../../src/aas'
import { Provider } from '../../../../../src/aas/components/context/AuthContext'

jest.mock('keycloak-js')

describe('<CheckLogin />', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const mockKeyCloak = (isAuthenticated: boolean) => {
    const tokenParsed: KeycloakTokenParsed = {
      exp: 10
    }
    const roles: KeycloakRoles = { roles: ['roles', 'test-realm-roles'] }
    const keycloakResourceAccess: KeycloakResourceAccess = { mockResource: roles }
    const mockKeycloak: Auth = {
      hasRealmRole: () => true,
      hasResourceRole: () => true,
      isAuthenticated: () => isAuthenticated,
      logout: jest.fn(),
      token: () => 'token string',
      tokenParsed: () => tokenParsed,
      realmAccess: () => roles,
      resourceAccess: () => keycloakResourceAccess,
      loadUserProfile: jest.fn()
    }

    const mockFn = mocked(Keycloak, true)
    const keycloakInstance = mockedKeyCloakInstance()
    mockFn.mockReturnValue(keycloakInstance)
    return mockKeycloak
  }

  const props = {
    children: <div id="auth">Authentication successful</div>,
    error: <div id="error">Authentication unsuccessful</div>
  }
  const mockLogin = jest.fn()
  const mockLogout = jest.fn()

  test('should render children elements if authentication is true', async () => {
    const mockKeycloak = mockKeyCloak(true)

    const { queryByText } = render(
      <Provider value={{ auth: mockKeycloak, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(queryByText('Authentication successful')).toBeTruthy()
    expect(queryByText('Authentication unsuccessful')).toBeFalsy()
  })

  test('should not render children elements if authentication is false', () => {
    const mockKeycloak = mockKeyCloak(false)

    const { queryByText } = render(
      <Provider value={{ auth: mockKeycloak, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(queryByText('Authentication successful')).toBeTruthy()
    expect(queryByText('Authentication unsuccessful')).toBeFalsy()
  })

  test('should render CheckLogin if authentication is true', () => {
    const mockKeycloak = mockKeyCloak(true)

    const { container } = render(
      <Provider value={{ auth: mockKeycloak, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should not render CheckLogin if authentication is false', () => {
    const mockKeycloak = mockKeyCloak(false)

    const { container } = render(
      <Provider value={{ auth: mockKeycloak, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render nothing if CheckLogin if authentication is false and error component is not provided', () => {
    const mockKeycloak = mockKeyCloak(false)

    const props = {
      children: <div className="auth">Authentication successful</div>,
      error: null
    }

    const { container } = render(
      <Provider value={{ auth: mockKeycloak, login: mockLogin, logout: mockLogout }}>
        <CheckLogin {...props} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })
})
