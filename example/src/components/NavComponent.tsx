import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
// #import-components
import { AuthContext, Logout, Login } from 'esw-ts'
// #import-components

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
            <Link to='/public'> Public </Link>
          </li>
          <li>
            <Link to='/secured'> Secured </Link>
          </li>
          <li>
            <Link id='config-link' to='/config'>
              {' '}
              Config App{' '}
            </Link>
          </li>
          <li>
            <Link to='/example_admin'> Admin App </Link>
          </li>
          <li>
            <Link to='/example_user'> User App </Link>
          </li>
          <li>
            {!auth ? (
              <span>Loading...</span>
            ) : auth.isAuthenticated() ? (
              // #logout-component-usage
              <Logout />
            ) : (
              // #logout-component-usage
              // #login-component-usage
              <Login />
              // #login-component-usage
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavComponent
