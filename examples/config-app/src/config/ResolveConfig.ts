import {HttpConnection, LocationService, Prefix} from 'esw-ts'
import {Duration} from "esw-ts";

export const resolveConfig = async () => {
  let httpConnection = new HttpConnection(new Prefix('CSW', 'ConfigServer'), "Service");
  const locationService = new LocationService()
  const configServerLocation = await locationService.resolve(httpConnection, new Duration(10, 'seconds'))
  if(configServerLocation.length < 1) console.log('config server not found')
  return configServerLocation[0].uri
}
