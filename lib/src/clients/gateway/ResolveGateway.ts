import { gatewayConnection } from '../../config/Connections'
import { extractHostPort } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'

export const resolveGateway: () => Promise<{ port: number; host: string }> = async () => {
  const location = await resolve(gatewayConnection)
  return extractHostPort(location.uri)
}
