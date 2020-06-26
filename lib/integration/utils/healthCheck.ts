import { LocationService } from '../../src/clients/location'
import { eventually } from './eventually'
import { resolve } from '../../src/clients/location/LocationUtils'
import { authConnection, BackendServices, ServiceName } from '../../src/utils/ServicesConnections'

const locationService = new LocationService()

const waitForLocationToUp = () => eventually(() => locationService.list())
const waitForAASToUp = () => eventually(() => resolve(authConnection))
const gatewayServices: ServiceName[] = ['Alarm', 'Event']

export const waitForServicesToUp = async (serviceNames: ServiceName[]) => {
  await waitForLocationToUp()
  if (serviceNames.includes('AAS')) await waitForAASToUp()

  const servicesExceptAAS = serviceNames.filter((name) => name != 'AAS')
  let servicesToHealthCheck = servicesExceptAAS

  if (servicesExceptAAS.includes('Gateway')) {
    servicesToHealthCheck = servicesExceptAAS.filter((name) => gatewayServices.includes(name))
  }
  return await Promise.all(servicesToHealthCheck.map((name) => resolve(BackendServices[name])))
}

export const waitForLocationServiceToStop = () =>
  new Promise((resolve) => {
    locationService
      .list()
      .catch(resolve)
      .then(() => setTimeout(() => resolve(waitForLocationServiceToStop()), 100))
  })
