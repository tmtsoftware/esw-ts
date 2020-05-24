import { HttpConnection, LocationService } from 'clients/location'
import { GatewayConfig } from 'config/GatewayConfig'
import { Prefix } from 'models'
import { extractHostPort } from 'utils/Utils'

const ResolveTimeout = 5

export const GatewayConnection = new HttpConnection(
  new Prefix(GatewayConfig.subsystem, GatewayConfig.componentName),
  GatewayConfig.componentType
)

export const resolveGateway = async () => {
  const locationService = new LocationService()
  const [location] = await locationService.resolve(GatewayConnection, ResolveTimeout)
  if (!location) throw Error(`Gateway Server not found for connection: ${GatewayConnection}`)
  return extractHostPort(location.uri)
}
