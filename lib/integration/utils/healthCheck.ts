import { LocationService } from '../../src/clients/location'
import { resolve } from '../../src/clients/location/LocationUtils'
import { authConnection } from '../../src/config/connections'
import { LocationConfigWithAuth } from '../../test/helpers/LocationConfigWithAuth'
import { BackendServices, ServiceName } from './backend'
import { eventually } from './eventually'

const locationService = LocationService()
const locationServiceWithAuth = LocationService(() => undefined, LocationConfigWithAuth)

const waitForLocationToUp = () => eventually(() => locationService.list())
const waitForLocationWithAuthToUp = () => eventually(() => locationServiceWithAuth.list())
const waitForAASToUp = () => eventually(() => resolve(authConnection))
const gatewayServices: ServiceName[] = ['Alarm', 'Event']

export const waitForServicesToUp = async (serviceNames: ServiceName[]) => {
  await waitForLocationToUp()
  if (serviceNames.includes('AAS')) await waitForAASToUp()
  if (serviceNames.includes('LocationWithAuth')) await waitForLocationWithAuthToUp()

  const filteredServices = serviceNames.filter(
    (name) => name != 'AAS' && name != 'LocationWithAuth'
  )
  let servicesToHealthCheck = filteredServices

  if (filteredServices.includes('Gateway')) {
    servicesToHealthCheck = filteredServices.filter((name) => gatewayServices.includes(name))
  }
  return await Promise.all(servicesToHealthCheck.map((name) => resolve(BackendServices[name])))
}

export const waitForLocationToStop = () =>
  eventually(
    () =>
      new Promise((resolve, reject) => {
        locationService.list().then(reject).catch(resolve)
      })
  )
