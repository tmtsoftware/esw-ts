import { Connection } from './models/Connection'
import { LocationService } from './LocationService'

const locationService = new LocationService()

export const resolve = async (connection: Connection, timeout = 10) => {
  const [location] = await locationService.resolve(connection, timeout)

  if (!location) throw new Error(`${connection.prefix.toJSON()} not found`)
  return location
}
