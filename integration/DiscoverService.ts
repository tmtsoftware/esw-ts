import { HttpConnection, LocationService } from 'clients/location'
import { ComponentType, Prefix } from 'models'

export const isResolved = async (prefix: Prefix, componentType: ComponentType) => {
  const locationService = new LocationService()
  const connection: HttpConnection = new HttpConnection(prefix, componentType)

  const [location] = await locationService.resolve(connection, 10)
  if (!location) throw new Error(`prefix ${prefix} not found`)
  return true
}
