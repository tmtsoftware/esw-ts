import { LocationService } from '../../src/clients/location'
import { resolve } from '../../src/clients/location/LocationUtils'
import { authConnection } from '../../src/config/connections'
import { BackendServices, ServiceName } from './backend'
import { eventually } from './eventually'

const locationService = LocationService()

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

export const waitForLocationToStop = () =>
  eventually(
    () =>
      new Promise((resolve, reject) => {
        locationService.list().then(reject).catch(resolve)
      })
  )
