import type {Connection} from './models/Connection'
import type {TimeUnit} from './models/Duration'
import type {Location} from './models/Location'
import {LocationService} from "./LocationService";

export const resolve: (
  connection: Connection,
  timeout?: number,
  timeoutUnit?: TimeUnit
) => Promise<Location> = async (
  connection: Connection,
  timeout = 10,
  timeoutUnit: TimeUnit = 'seconds'
) => {
  const locationService = LocationService()
  console.log('******checking location service********', locationService)
  const location = await locationService.resolve(connection, timeout, timeoutUnit)

  if (!location) throw new Error(`${connection.prefix.toJSON()} not found`)
  return location
}
