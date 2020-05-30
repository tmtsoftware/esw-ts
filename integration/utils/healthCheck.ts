import { LocationService } from 'clients/location'
import { authConnection } from 'utils/auth'
import { BackendServices, ServiceName } from 'utils/backend'
import { eventually } from 'utils/eventually'
import { resolve } from 'utils/resolve'

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
