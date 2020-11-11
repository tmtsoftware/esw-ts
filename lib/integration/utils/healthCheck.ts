import { LocationService } from '../../src/clients/location'
import { resolve } from '../../src/clients/location/LocationUtils'
import { BackendServices, ServiceName } from './backend'
import { eventually } from './eventually'

const locationService = LocationService()

const waitForLocationToUp = () => eventually(() => locationService.list())

export const waitForServicesToUp = async (serviceNames: ServiceName[]) => {
  await waitForLocationToUp()
  const filteredServices = serviceNames.filter(
    (name) => name != 'AAS' && name != 'LocationWithAuth'
  )
  return await Promise.all(filteredServices.map((name) => resolve(BackendServices[name])))
}

export const waitForLocationToStop = () =>
  eventually(
    () =>
      new Promise((resolve, reject) => {
        locationService.list().then(reject).catch(resolve)
      })
  )
