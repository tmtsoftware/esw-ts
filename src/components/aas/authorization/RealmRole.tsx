import React, { useContext } from 'react'
import { AuthContext, AuthContextType } from '../context/AuthContext'

export interface RealmRoleProps {
  realmRole: string
  children: React.ReactNode
  error: React.ReactNode
}

/**
 * React component which renders if user is authenticated and has specified realm role
 * @param realmRole (required prop) string which specifies expected realm role
 * @param children (optional prop) can be react components or html element which will be rendered
 * if user is authenticated and has specified realm role
 * @param error (optional prop) can be react components or html element which will be rendered
 * if user is not authenticated or does not have specified realm role
 * @returns React component
 */
const RealmRole = ({ realmRole, children, error }: RealmRoleProps) => {
  const { auth } = useContext<AuthContextType>(AuthContext)
  const node =
    auth && auth.isAuthenticated && auth.isAuthenticated() && auth.hasRealmRole(realmRole)
      ? children
      : error

  return <div>{node}</div>
}

export default RealmRole
