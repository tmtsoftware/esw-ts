import React from 'react'

interface RoleProps {
  message: string
}
const RoleError = ({ message }: RoleProps) => <div>{message}</div>

export default RoleError
