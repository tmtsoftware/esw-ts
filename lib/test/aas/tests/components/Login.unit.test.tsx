import React from 'react'
import { Provider } from '../../../../src/components/aas/context/AuthContext'
import { Login } from '../../../../src/components'
import { fireEvent, render } from '@testing-library/react'
import { mockAuth } from '../../../utils/MockHelpers'

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
