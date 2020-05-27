import { Connection, LocationService } from 'clients/location'
import { authConnection } from 'utils/auth'
import { BackendServices, ServiceName } from 'utils/backend'
import { eventually } from 'utils/eventually'

const locationService = new LocationService()

export const resolve = async (connection: Connection, timeout = 10) => {
  const [location] = await locationService.resolve(connection, timeout)

  if (!location) throw new Error(`${connection.prefix.toJSON()} not found`)
  console.log(`${connection.prefix.toJSON()} is resolved`)
  return location
}

const waitForLocationToUp = () => eventually(() => locationService.list())
const waitForAASToUp = () => eventually(() => resolve(authConnection))

export const waitForServicesToUp = async (serviceNames: ServiceName[]) => {
  await waitForLocationToUp()
  if (serviceNames.includes('AAS')) await waitForAASToUp()

  const servicesExceptAAS = serviceNames.filter((name) => name != 'AAS')
  return await Promise.all(
    servicesExceptAAS.map((name) => BackendServices[name]).map((connection) => resolve(connection))
  )
}
