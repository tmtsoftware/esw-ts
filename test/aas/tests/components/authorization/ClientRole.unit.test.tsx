import React from 'react'
import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import Keycloak from 'keycloak-js'
import { mockAuth, mockedKeyCloakInstance } from '../../../../utils/MockHelpers'
import { ClientRole } from '../../../../../src/aas'
import { Provider } from '../../../../../src/aas/components/context/AuthContext'

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

  test('should render children elements if authentication is true and with valid Client role', () => {
    const props = {
      children: <div className="client-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      clientRole: 'test-client-role',
      client: 'test-client'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(true), logout: jest.fn(), login: jest.fn() }}>
        <ClientRole {...props} />
      </Provider>
    )

    expect(container.getElementsByClassName('client-role').length).toBe(1)
    expect(container.getElementsByClassName('error').length).toBe(0)
  })

  test('should not render children elements if authentication is true but invalid Client role', () => {
    const props = {
      children: <div className="client-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      clientRole: 'invalid-client-role',
      client: 'invalid-client'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(true, false), logout: jest.fn(), login: jest.fn() }}>
        <ClientRole {...props} />
      </Provider>
    )

    expect(container.getElementsByClassName('client-role').length).toBe(0)
    expect(container.getElementsByClassName('error').length).toBe(1)
  })

  test('should not render children elements if authentication is false ', () => {
    const props = {
      children: <div className="client-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      clientRole: 'invalid-client-role',
      client: 'invalid-client'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(true, false), logout: jest.fn(), login: jest.fn() }}>
        <ClientRole {...props} />
      </Provider>
    )

    expect(container.getElementsByClassName('client-role').length).toBe(0)
    expect(container.getElementsByClassName('error').length).toBe(1)
  })

  test('should render ClientRole if authentication is true and with valid Client role', () => {
    const props = {
      children: <div className="client-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      clientRole: 'test-client-role',
      client: 'test-client'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(), logout: jest.fn(), login: jest.fn() }}>
        <ClientRole {...props} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should not render ClientRole if authentication is true but invalid Client role', () => {
    const props = {
      children: <div className="client-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      clientRole: 'invalid-client-role',
      client: 'invalid-client'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(true, false), logout: jest.fn(), login: jest.fn() }}>
        <ClientRole {...props} />
      </Provider>
    )
    expect(container).toMatchSnapshot()
  })

  test('should not render ClientRole if authentication is false ', () => {
    const props = {
      children: <div className="client-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      clientRole: 'invalid-client-role',
      client: 'invalid-client'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(false, true), logout: jest.fn(), login: jest.fn() }}>
        <ClientRole {...props} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render nothing if authentication is false and error component is not provided', () => {
    const authContext = {
      auth: {
        hasResourceRole: jest.fn().mockImplementation(() => {
          return true
        }),
        isAuthenticated: jest.fn().mockImplementation(() => {
          return false
        })
      }
    }

    const props = {
      children: <div className="client-role">Authentication successful</div>,
      clientRole: 'invalid-client-role',
      client: 'invalid-client'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(true, false), logout: jest.fn(), login: jest.fn() }}>
        <ClientRole {...props} />
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })
})
