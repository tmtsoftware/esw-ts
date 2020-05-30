import { Connection, LocationService } from 'clients/location'

const locationService = new LocationService()

// fixme: see if it can be moved to LocationService.resolve API
export const resolve = async (connection: Connection, timeout = 10) => {
  const [location] = await locationService.resolve(connection, timeout)

  if (!location) throw new Error(`${connection.prefix.toJSON()} not found`)
  return location
}
