import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AuthContextConfig, AuthContextProvider, Login } from '../../src/aas'

export const simulateLogin = async () => {
  const config: AuthContextConfig = {
    realm: 'TMT-test',
    clientId: 'esw-gateway-client'
  }

  const { getByText, getAllByTitle, container } = render(
    <AuthContextProvider config={config}>
      <Login />
    </AuthContextProvider>
  )
  container.addEventListener('message', (event) => {
    console.log('**********', window.location.href) // capture the url
    event.preventDefault() // just to pause and see the condole
  })

  fireEvent.click(getByText('Login'))

  return { getAllByTitle }
}
