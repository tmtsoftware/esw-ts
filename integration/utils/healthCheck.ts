import { LocationService } from '../../src/clients/location'
import { resolve } from '../../src/clients/location/LocationUtils'
import { BackendServices, ServiceName } from './backend'
import { eventually } from './eventually'

const locationServiceP = LocationService().then((r) => r)

const waitForLocationToUp = () => eventually(async () => (await locationServiceP).list())

export const waitForServicesToUp = async (serviceNames: ServiceName[]) => {
  await waitForLocationToUp()
  const filteredServices = serviceNames.filter((name) => name != 'AAS' && name != 'LocationWithAuth')
  return await Promise.all(filteredServices.map((name) => resolve(BackendServices[name])))
}

export const waitForLocationToStop = () =>
  eventually(
    () =>
      new Promise(async (resolve, reject) => {
        const locationService = await locationServiceP
        locationService.list().then(reject).catch(resolve)
      })
  )
