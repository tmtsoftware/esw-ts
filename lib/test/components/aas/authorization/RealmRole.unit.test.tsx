import { render } from '@testing-library/react'
import React from 'react'
import { RealmRole } from '../../../../src/components'
import { Provider } from '../../../../src/components/aas/context/AuthContext'
import { mockAuth } from '../../../helpers/MockHelpers'
// DEOPSCSW-630 - Javascript adapter for AAS
// DEOPSCSW-636 - JS adapter support  for Authorization
describe('<RealmRole />', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('should render children elements if authentication is true and with valid realm role | ESW-330', () => {
    const props = {
      children: <div className="realm-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      realmRole: 'test-realm-roles'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(), login: jest.fn(), logout: jest.fn() }}>
        <RealmRole {...props} />
      </Provider>
    )

    expect(container.getElementsByClassName('realm-role').length).toBe(1)
    expect(container.getElementsByClassName('error').length).toBe(0)
    expect(container).toMatchSnapshot()
  })

  test('should not render children elements if authentication is true but invalid realm role | ESW-330', () => {
    const props = {
      children: <div className="realm-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      realmRole: 'invalid-realm-role'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(), login: jest.fn(), logout: jest.fn() }}>
        <RealmRole {...props} />
      </Provider>
    )

    expect(container.getElementsByClassName('realm-role').length).toBe(0)
    expect(container.getElementsByClassName('error').length).toBe(1)
    expect(container).toMatchSnapshot()
  })

  test('should not render children elements if authentication is false | ESW-330', () => {
    const props = {
      children: <div className="realm-role">Authentication successful</div>,
      error: <div className="error">Authentication unsuccessful</div>,
      realmRole: 'invalid-realm-role'
    }

    const { container } = render(
      <Provider value={{ auth: mockAuth(false), login: jest.fn(), logout: jest.fn() }}>
        <RealmRole {...props} />
      </Provider>
    )

    expect(container.getElementsByClassName('realm-role').length).toBe(0)
    expect(container.getElementsByClassName('error').length).toBe(1)
    expect(container).toMatchSnapshot()
  })
})
