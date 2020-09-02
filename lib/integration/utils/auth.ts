import { Location } from '../../src/clients/location'
import { resolve } from '../../src/clients/location/LocationUtils'
import { authConnection } from '../../src/config/Connections'
import { extractHostPort } from '../../src/utils/Utils'

const getKeycloakTokenUri = async (realm: string) => {
  const authLocation: Location = await resolve(authConnection)
  const { host, port } = extractHostPort(authLocation.uri)
  const tokenPath = `auth/realms/${realm}/protocol/openid-connect/token`
  return `http://${host}:${port}/${tokenPath}`
}
export const getToken = async (client: string, user: string, password: string, realm: string) => {
  const payload = {
    client_id: client,
    grant_type: 'password',
    username: user,
    password: password
  }

  const url = await getKeycloakTokenUri(realm)
  const headers = new Headers([['Content-type', 'application/x-www-form-urlencoded']])

  const response = await fetch(url, {
    method: 'POST',
    body: new URLSearchParams(payload).toString(),
    headers
  })

  if (!response.ok) throw new Error('auth token error')
  const { access_token } = await response.json()
  return access_token
}
