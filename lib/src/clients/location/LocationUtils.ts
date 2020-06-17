import { Connection } from './models/Connection'
import { LocationService } from './LocationService'
import { Duration, TimeUnit } from './models/Duration'

const locationService = new LocationService()

export const resolve = async (
  connection: Connection,
  timeout = 10,
  timeoutUnit: TimeUnit = 'seconds'
) => {
  const [location] = await locationService.resolve(connection, new Duration(timeout, timeoutUnit))

  if (!location) throw new Error(`${connection.prefix.toJSON()} not found`)
  return location
}
