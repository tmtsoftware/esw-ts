import { HttpConnection } from '../location'
import { GatewayConfig } from '../../config'
import { Prefix } from '../../models'
import { extractHostPort } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'

export const GatewayConnection = HttpConnection(
  new Prefix(GatewayConfig.subsystem, GatewayConfig.componentName),
  GatewayConfig.componentType
)

export const resolveGateway: () => Promise<{ port: number; host: string }> = async () => {
  const location = await resolve(GatewayConnection)
  return extractHostPort(location.uri)
}
