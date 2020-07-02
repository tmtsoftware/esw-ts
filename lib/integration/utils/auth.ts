import { resolve } from '../../src/clients/location/LocationUtils'
import { authConnection } from '../../src/config/connections'
import { post } from '../../src/utils/Http'
import { extractHostPort } from '../../src/utils/Utils'
import { Location } from '../../src/clients/location'

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

  const endpoint = await getKeycloakTokenUri(realm)
  const headers = new Headers([['Content-Type', 'application/x-www-form-urlencoded']])

  const { access_token } = await post({ endpoint, payload, headers })
  return access_token
}
