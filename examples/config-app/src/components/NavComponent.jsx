import React, { useContext } from 'react'
import { Logout, Login, AuthContext } from 'esw-ts'

const NavComponent = () => {
  const { auth } = useContext(AuthContext)
  return (
    <nav className='indigo'>
      <div className='nav-wrapper'>
        <a href='https://www.tmt.org/' className='brand-logo'>
          TMT
        </a>
        <ul className='hide-on-med-and-down right'>
          <li>
            {!auth ? (
              <span>Loading...</span>
            ) : auth.isAuthenticated() ? (
              <Logout />
            ) : (
              <Login />
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavComponent
