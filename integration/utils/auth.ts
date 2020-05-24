import { post } from 'utils/post'
import { HttpConnection } from 'clients/location'
import { Prefix } from 'models'
import { extractHostPort } from 'utils/Utils'
import { resolve } from 'utils/resolve'
import { delay } from 'utils/eventually'

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

export const getToken = async (client: string, user: string, password: string) => {
  const authLocation = await resolve(authConnection)
  await delay(20000)
  const { host, port } = extractHostPort(authLocation.uri)

  const payload = {
    client_id: client,
    grant_type: 'password',
    username: user,
    password: password
  }
  return post<AuthRequest, AuthToken>(host, port, payload).then((value) => value.access_token)
}
