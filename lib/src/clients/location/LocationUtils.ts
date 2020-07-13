import { Connection } from './models/Connection'
import { LocationService } from './LocationService'
import { Duration, TimeUnit } from './models/Duration'
import { Location } from './models/Location'
import { PrefixV } from '../../models'

const locationService = new LocationService()

export const resolve: (
  connection: Connection,
  timeout?: number,
  timeoutUnit?: TimeUnit
) => Promise<Location> = async (
  connection: Connection,
  timeout = 10,
  timeoutUnit: TimeUnit = 'seconds'
) => {
  const [location] = await locationService.resolve(connection, new Duration(timeout, timeoutUnit))

  if (!location) throw new Error(`${PrefixV.encode(connection.prefix)} not found`)
  return location
}
