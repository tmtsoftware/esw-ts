import React, { useContext } from 'react'
import { AuthContext, AuthContextType } from '../context/AuthContext'

export interface CheckLoginProps {
  children: React.ReactNode
  error: React.ReactNode
}

/**
 * React component which renders children if authenticated and error if unauthenticated
 * @param children (optional prop) can be react components or html element which will be rendered
 * if user is authenticated
 * @param error (optional prop) can be react components or html element which will be rendered
 * if user is not authenticated
 */

const CheckLogin = ({ children, error }: CheckLoginProps) => {
  const { auth } = useContext<AuthContextType>(AuthContext)
  const node = auth && auth.isAuthenticated && auth.isAuthenticated() ? children : error
  return <div>{node}</div>
}

export default CheckLogin
