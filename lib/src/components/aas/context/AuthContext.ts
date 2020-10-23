import { createContext } from 'react'
import type { Auth } from '../../../clients/aas'

export interface AuthContextType {
  auth: Auth | null
  login: () => void
  logout: () => void
}

const AuthContextDefaultState = {
  auth: null,
  login: () => undefined,
  logout: () => undefined
}
/**
 * Default state for AuthContextProvider
 * @type {{auth: undefined, login: (function(): boolean), logout: (function(): boolean)}}
 */
const AuthContext = createContext<AuthContextType>(AuthContextDefaultState)
const { Provider, Consumer } = AuthContext

// todo: AuthContext is exported to support scala.js, see if only exporting Consumer works
export { AuthContext, Provider, Consumer, AuthContextDefaultState }
