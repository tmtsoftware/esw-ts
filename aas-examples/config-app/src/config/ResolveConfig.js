import {HttpConnection, LocationService, Prefix} from 'gateway-tsclient'

export const resolveConfig = async () => {
  let httpConnection = new HttpConnection(new Prefix('CSW', 'ConfigServer'), "Service");
  const locationService = new LocationService()
  const configServerLocation = await locationService.resolve(httpConnection, 10)
  if(configServerLocation.length < 1) console.log('config server not found')
  return configServerLocation[0].uri
}
