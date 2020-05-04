import { HttpConnection, Location, LocationService } from 'clients/location'
import { Prefix } from 'models'

const ResolveTimeout = 5

const extractHostPort = (location: Location) => {
  const [host, _port] = location.uri.split('/')[2].split(':')
  const port = parseInt(_port)
  return { host, port }
}

export const GatewayConnection = new HttpConnection(new Prefix('ESW', 'Gateway'), 'Service')

export const resolveGateway = () => {
  const locationService = new LocationService('localhost', 7654)
  return locationService.resolve(GatewayConnection, ResolveTimeout).then(([location]) => {
    if (!location) throw Error(`Gateway Server not found for connection: ${GatewayConnection}`)
    return extractHostPort(location)
  })
}
