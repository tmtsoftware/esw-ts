import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

export const AASLogin = () => {
  const { login } = useContext(AuthContext)
  return (
    <div>
      <input type={'text'} id={'username'} />
      <input type={'text'} id={'password'} />
      <button id={'login'} onClick={login}>
        Login
      </button>
    </div>
  )
}
