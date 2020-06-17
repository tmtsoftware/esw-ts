import React from 'react'
import { Logout } from '../../../src/components'
import { fireEvent, render } from '@testing-library/react'
import { Provider } from '../../../src/components/aas/context/AuthContext'
import { mockAuth } from '../../utils/MockHelpers'

// DEOPSCSW-630 - Javascript adapter for AAS
// DEOPSCSW-631 - React layer for javascript adapter for AAS
describe('<Logout />', () => {
  test('should call logout', async () => {
    const mockLogout = jest.fn()
    const { getByText } = await render(
      <Provider value={{ logout: mockLogout, auth: mockAuth(), login: jest.fn() }}>
        <Logout />
      </Provider>
    )

    fireEvent.click(getByText('Logout'))

    expect(mockLogout).toHaveBeenCalled()
  })

  test('should render logout', () => {
    const { container } = render(<Logout />)
    expect(container).toMatchSnapshot()
  })
})
