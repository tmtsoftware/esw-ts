import type { Auth } from '../../../clients/aas'

export interface AuthContextType {
  auth: Auth | null
  login: () => void
  logout: () => void
}

export const AuthContextDefaultState = {
  auth: null,
  login: () => undefined,
  logout: () => undefined
}
