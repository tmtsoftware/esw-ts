import { HttpConnection } from 'clients/location'
import { Prefix } from 'models'
import { post } from 'utils/post'
import { resolve } from 'utils/resolve'
import { extractHostPort } from 'utils/Utils'

interface AuthToken {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  'not-before-policy': number
  session_state: string
  scope: string
}

interface AuthRequest {
  client_id: string
  grant_type: string
  username: string
  password: string
}

export const authConnection = new HttpConnection(new Prefix('CSW', 'AAS'), 'Service')

const getKeycloakTokenUri = async (realm: string) => {
  const authLocation = await resolve(authConnection)
  const { host, port } = extractHostPort(authLocation.uri)
  const tokenPath = `auth/realms/${realm}/protocol/openid-connect/token`
  return { host, port, tokenPath }
}

export const getToken = async (client: string, user: string, password: string, realm: string) => {
  const payload: AuthRequest = {
    client_id: client,
    grant_type: 'password',
    username: user,
    password: password
  }

  const { host, port, tokenPath } = await getKeycloakTokenUri(realm)
  const headers = new Headers([['Content-Type', 'application/x-www-form-urlencoded']])

  const authToken = await post<AuthRequest, AuthToken>(host, port, payload, tokenPath, headers)
  return authToken.access_token
}
