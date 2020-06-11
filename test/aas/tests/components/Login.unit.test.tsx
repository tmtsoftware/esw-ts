import React from 'react'
import { Provider } from '../../../../src/aas/components/context/AuthContext'
import { AuthContextConfig, AuthContextProvider, Login } from '../../../../src/aas'
import { render, fireEvent } from '@testing-library/react'
import { mockAuth } from '../../../utils/MockHelpers'
import { delay } from '../../../../integration/utils/eventually'

// DEOPSCSW-630 - Javascript adapter for AAS
// DEOPSCSW-631 - React layer for javascript adapter for AAS
describe('<Login />', () => {
  test('should call login', async () => {
    const mockLogin = jest.fn()
    const { getByText } = await render(
      <Provider value={{ auth: mockAuth(), login: mockLogin, logout: jest.fn() }}>
        <Login />
      </Provider>
    )

    fireEvent.click(getByText('Login'))

    expect(mockLogin).toHaveBeenCalled()
  })

  test('should render login', async () => {
    const { container } = render(<Login />)
    expect(container).toMatchSnapshot()
  })
})
