import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

/**
 * React component which renders Logout button.
 */
const Logout = () => {
  const { logout } = useContext(AuthContext)
  return (
    // Call to this.props.logout method is responsible for logging out.
    <button id="keycloak-logout" onClick={logout}>
      Logout
    </button>
  )
}

export default Logout
