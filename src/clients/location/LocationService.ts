import { Location } from 'clients/location/models/Location'
import { post } from 'utils/Http'
import {
  ListEntries,
  LocationHttpMessage,
  Register,
  Unregister
} from 'clients/location/models/PostCommand'
import { Registration } from 'clients/location/models/Registration'
import { Done, RegistrationResult } from 'clients/location/models/LocationResponses'
import { Connection } from 'clients/location/models/Connection'

export interface LocationServiceApi {
  list(): Promise<Location[]>

  register(registration: Registration): Promise<RegistrationResult>

  unregister(connection: Connection): Promise<Done>
}

export class LocationService implements LocationServiceApi {
  constructor(readonly host: string, readonly port: number) {}

  httpPost<T>(request: LocationHttpMessage): Promise<T> {
    return post<LocationHttpMessage, T>(this.host, this.port, request)
  }

  list(): Promise<Location[]> {
    return this.httpPost<Location[]>(new ListEntries())
  }

  register(registration: Registration): Promise<RegistrationResult> {
    const locationPromise = this.httpPost<Location>(new Register(registration))
    return locationPromise.then((location: Location) => {
      return new RegistrationResult(location, this.unregister.bind(this))
    })
  }

  unregister(connection: Connection): Promise<Done> {
    return this.httpPost<Done>(new Unregister(connection))
  }
}
