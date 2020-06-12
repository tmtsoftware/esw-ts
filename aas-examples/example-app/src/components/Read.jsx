import React, { useContext } from 'react'
import { AuthContext } from 'gateway-tsclient'

const Read = () => {
  // #Consumer-component-usage
  const { auth } = useContext(AuthContext)
  return (
    <div className='nav-wrapper'>
      {auth && auth.isAuthenticated() ? (
        <div>
          Hello, you are logged in
          <div>Open functionality</div>
        </div>
      ) : (
        <div>
          Hello, you are not logged in
          <div>Open functionality</div>
        </div>
      )}
    </div>
  )
  // #Consumer-component-usage
}

export default Read
