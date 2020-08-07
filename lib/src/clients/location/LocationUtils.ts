import { LocationService } from './LocationService'
import { Connection } from './models/Connection'
import { Duration, TimeUnit } from './models/Duration'
import { Location } from './models/Location'

export const resolve: (
  connection: Connection,
  timeout?: number,
  timeoutUnit?: TimeUnit
) => Promise<Location> = async (
  connection: Connection,
  timeout = 10,
  timeoutUnit: TimeUnit = 'seconds'
) => {
  const locationService = new LocationService()
  const location = await locationService.resolve(connection, new Duration(timeout, timeoutUnit))

  if (!location) throw new Error(`${connection.prefix.toJSON} not found`)
  return location
}
