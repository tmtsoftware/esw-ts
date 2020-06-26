import { post } from '../../src/utils/Http'
import { extractHostPort } from '../../src/utils/Utils'
import { resolve } from '../../src/clients/location/LocationUtils'
import { authConnection } from '../../src/utils/ServicesConnections'

const getKeycloakTokenUri = async (realm: string) => {
  const authLocation = await resolve(authConnection)
  const { host, port } = extractHostPort(authLocation.uri)
  const tokenPath = `auth/realms/${realm}/protocol/openid-connect/token`
  return { host, port, path: tokenPath }
}

export const getToken = async (client: string, user: string, password: string, realm: string) => {
  const payload = {
    client_id: client,
    grant_type: 'password',
    username: user,
    password: password
  }

  const { host, port, path } = await getKeycloakTokenUri(realm)
  const headers = new Headers([['Content-Type', 'application/x-www-form-urlencoded']])

  const { access_token } = await post(host, port, {
    path: path,
    payload: payload,
    headers: headers
  })
  return access_token
}
