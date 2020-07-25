import React from 'react'
import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import Keycloak from 'keycloak-js'
import { mockAuth, mockedKeyCloakInstance } from '../../../helpers/MockHelpers'
import { AuthContext } from '../../../../src/components'
import ClientRole from '../../../../src/components/aas/authorization/ClientRole'

jest.mock('keycloak-js')
// DEOPSCSW-630 - Javascript adapter for AAS
// DEOPSCSW-636 - JS adapter support  for Authorization
describe('<ClientRole />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockFn = mocked(Keycloak, true)
  const keycloakInstance = mockedKeyCloakInstance()
  mockFn.mockReturnValue(keycloakInstance)

  test('should render children elements if authentication is true and with valid Client role | ESW-330', () => {
    const props = {
      children: <div className="client-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      clientRole: 'test-client-role',
      client: 'test-client'
    }

    const { container } = render(
      <AuthContext.Provider value={{ auth: mockAuth(true), logout: jest.fn(), login: jest.fn() }}>
        <ClientRole {...props} />
      </AuthContext.Provider>
    )

    expect(container.getElementsByClassName('client-role').length).toBe(1)
    expect(container.getElementsByClassName('error').length).toBe(0)
    expect(container).toMatchSnapshot()
  })

  test('should not render children elements if authentication is true but invalid Client role | ESW-330', () => {
    const props = {
      children: <div className="client-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      clientRole: 'invalid-client-role',
      client: 'invalid-client'
    }

    const { container } = render(
      <AuthContext.Provider
        value={{
          auth: mockAuth(true, false, 'test-realm-roles'),
          logout: jest.fn(),
          login: jest.fn()
        }}
      >
        <ClientRole {...props} />
      </AuthContext.Provider>
    )

    expect(container.getElementsByClassName('client-role').length).toBe(0)
    expect(container.getElementsByClassName('error').length).toBe(1)
    expect(container).toMatchSnapshot()
  })

  test('should not render children elements if authentication is false | ESW-330', () => {
    const props = {
      children: <div className="client-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      clientRole: 'invalid-client-role',
      client: 'invalid-client'
    }

    const { container } = render(
      <AuthContext.Provider
        value={{
          auth: mockAuth(true, false, 'test-realm-roles'),
          logout: jest.fn(),
          login: jest.fn()
        }}
      >
        <ClientRole {...props} />
      </AuthContext.Provider>
    )

    expect(container.getElementsByClassName('client-role').length).toBe(0)
    expect(container.getElementsByClassName('error').length).toBe(1)
    expect(container).toMatchSnapshot()
  })
})
