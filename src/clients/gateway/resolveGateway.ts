import { HttpConnection, Location, LocationService } from 'clients/location'
import { GatewayConfig } from 'config/GatewayConfig'
import { LocationConfig } from 'config/LocationConfig'
import { Prefix } from 'models'

const ResolveTimeout = 5

const extractHostPort = (location: Location) => {
  const [host, _port] = location.uri.split('/')[2].split(':')
  const port = parseInt(_port)
  return { host, port }
}

export const GatewayConnection = new HttpConnection(
  new Prefix(GatewayConfig.subsystem, GatewayConfig.componentName),
  GatewayConfig.componentType
)

export const resolveGateway = () => {
  const locationService = new LocationService(LocationConfig.hostName, LocationConfig.port)
  return locationService.resolve(GatewayConnection, ResolveTimeout).then(([location]) => {
    if (!location) throw Error(`Gateway Server not found for connection: ${GatewayConnection}`)
    return extractHostPort(location)
  })
}
