import { Connection } from 'clients/location/models/Connection'
import { Location } from 'clients/location/models/Location'
import { Done } from 'clients/location/models/LocationResponses'
import {
  ListEntries,
  LocationHttpMessage,
  Resolve,
  Unregister
} from 'clients/location/models/PostCommand'
import { post } from 'utils/Http'

export interface LocationServiceApi {
  list(): Promise<Location[]>
  unregister(connection: Connection): Promise<Done>
  resolve(connection: Connection, within: number): Promise<Location[]>
}

export class LocationService implements LocationServiceApi {
  constructor(readonly host: string, readonly port: number) {}

  httpPost<T>(request: LocationHttpMessage): Promise<T> {
    return post<LocationHttpMessage, T>(this.host, this.port, request)
  }

  list(): Promise<Location[]> {
    return this.httpPost<Location[]>(new ListEntries())
  }

  unregister(connection: Connection): Promise<Done> {
    return this.httpPost<Done>(new Unregister(connection))
  }

  //todo: decide on within parameter to be in seconds or custom time interval
  resolve(connection: Connection, within: number): Promise<Location[]> {
    return this.httpPost<Location[]>(new Resolve(connection, `${within} seconds`))
  }
}
