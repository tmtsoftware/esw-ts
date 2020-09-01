import { Location } from '../../src/clients/location'
import { resolve } from '../../src/clients/location/LocationUtils'
import { authConnection } from '../../src/config/Connections'
import { HeaderExt } from '../../src/utils/HeaderExt'
import { post } from '../../src/utils/Http'
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
  const headers = new HeaderExt().withContentType('application/x-www-form-urlencoded')

  const { access_token } = await post({ url, payload, headers, metricsEnabled: false })
  return access_token
}
