import React, { useContext } from 'react'
import { AuthContext, AuthContextType } from '../context/AuthContext'

/**
 * React component which renders if user is authenticated and has specified client role
 * @param clientRole (required prop) string which specifies expected client role
 * @param client (optional prop) string which specifies expected client.If not specified, `clientId` is used.
 * @param children (optional prop) can be react components or html element which will be rendered
 * if user is authenticated and has specified client role
 * @param error (optional prop) can be react components or html element which will be rendered
 * if user is not authenticated or does not have specified client role
 * @returns React component
 */

export interface ClientRoleProps {
  clientRole: string
  client?: string
  children: React.ReactNode
  error?: React.ReactNode
}

const ClientRole = ({ clientRole, client, children, error }: ClientRoleProps) => {
  const { auth } = useContext<AuthContextType>(AuthContext)
  const node =
    auth &&
    auth.isAuthenticated &&
    auth.isAuthenticated() &&
    auth.hasResourceRole(clientRole, client)
      ? children
      : error

  return <div>{node}</div>
}

export default ClientRole
