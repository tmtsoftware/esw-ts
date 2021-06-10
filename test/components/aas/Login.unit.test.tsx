import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Login } from '../../../src/components'
import { Provider } from '../../../src/components/aas/context/AuthContext'
import { mockAuth } from '../../helpers/MockHelpers'

// DEOPSCSW-630 - Javascript adapter for AAS
// DEOPSCSW-631 - React layer for javascript adapter for AAS
describe('<Login />', () => {
  test('should call login | ESW-330', async () => {
    const mockLogin = jest.fn()
    const { getByText } = await render(
      <Provider value={{ auth: mockAuth(), login: mockLogin, logout: jest.fn() }}>
        <Login />
      </Provider>
    )

    fireEvent.click(getByText('Login'))

    expect(mockLogin).toHaveBeenCalled()
  })

  test('should render login | ESW-330', async () => {
    const { container } = render(<Login />)
    expect(container).toMatchSnapshot()
  })
})
