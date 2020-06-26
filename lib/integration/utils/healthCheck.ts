import { LocationService } from '../../src/clients/location'
import { eventually } from './eventually'
import { resolve } from '../../src/clients/location/LocationUtils'
import { authConnection, BackendServices, ServiceName } from '../../src/utils/ServicesConnections'

const locationService = new LocationService()

const waitForLocationToUp = () => eventually(() => locationService.list())
const waitForAASToUp = () => eventually(() => resolve(authConnection))

export const waitForServicesToUp = async (serviceNames: ServiceName[]) => {
  await waitForLocationToUp()
  if (serviceNames.includes('AAS')) await waitForAASToUp()

  const servicesExceptAAS = serviceNames.filter((name) => name != 'AAS')
  return await Promise.all(servicesExceptAAS.map((name) => resolve(BackendServices[name])))
}

export const waitForLocationServiceToStop = () =>
  new Promise((resolve) => {
    locationService
      .list()
      .catch(resolve)
      .then(() => setTimeout(() => resolve(waitForLocationServiceToStop()), 100))
  })
