import { HttpConnection } from 'clients/location'
import { Prefix } from 'models'
import { RequestConfig } from 'utils/post'
import { resolve } from 'utils/resolve'
import { extractHostPort } from 'utils/Utils'

export const authConnection = new HttpConnection(new Prefix('CSW', 'AAS'), 'Service')

export const getToken = async (client: string, user: string, password: string, realm: string) => {
  const authLocation = await resolve(authConnection)
  const { host, port } = extractHostPort(authLocation.uri)

  const payload = new URLSearchParams({
    client_id: client,
    grant_type: 'password',
    username: user,
    password: password
  })

  const tokenPath = `auth/realms/${realm}/protocol/openid-connect/token`

  const request: RequestConfig = {
    method: 'POST',
    headers: new Headers([['Content-Type', 'application/x-www-form-urlencoded']]),
    body: payload.toString()
  }

  return await fetch(`http://${host}:${port}/${tokenPath}`, request)
    .then((res) => res.json())
    .then((value) => value.access_token)
}
