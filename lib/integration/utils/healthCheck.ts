import { LocationService } from '../../src/clients/location'
import { authConnection } from './auth'
import { BackendServices, ServiceName } from './backend'
import { eventually } from './eventually'
import { resolve } from '../../src/clients/location/LocationUtils'

const locationService = new LocationService()

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

export const waitForLocationServiceToStop = () =>
  new Promise((resolve) => {
    locationService
      .list()
      .catch(resolve)
      .then(() => setTimeout(() => resolve(waitForLocationServiceToStop()), 100))
  })

export const resolveConfigApp = async () => {
  // await eventually(() => fetch('http://localhost:3000', { method: 'GET', headers: [['']]}))
}
