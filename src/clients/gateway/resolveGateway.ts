import { HttpConnection } from 'clients/location'
import { GatewayConfig } from 'config/GatewayConfig'
import { Prefix } from 'models'
import { resolve } from 'utils/healthCheck'
import { extractHostPort } from 'utils/Utils'

export const GatewayConnection = new HttpConnection(
  new Prefix(GatewayConfig.subsystem, GatewayConfig.componentName),
  GatewayConfig.componentType
)

export const resolveGateway = async () => {
  const location = await resolve(GatewayConnection)
  return extractHostPort(location.uri)
}
