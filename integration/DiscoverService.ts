import { Connection, LocationService } from 'clients/location'

const locationService = new LocationService()

export const isResolved = async (connection: Connection) => {
  const [location] = await locationService.resolve(connection, 10)
  if (!location) throw new Error(`${connection.prefix.toJSON()} not found`)
  console.log(`${connection.prefix.toJSON()} is resolved`)
  return true
}
