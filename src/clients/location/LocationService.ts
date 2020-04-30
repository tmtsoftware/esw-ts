import { TypedLocation } from 'clients/location/models/Location'
import { post } from 'utils/Http'
import { ListEntries, LocationHttpMessage } from 'clients/location/models/PostCommand'

export interface LocationServiceApi {
  list(): Promise<TypedLocation[]>
}

export class LocationService implements LocationServiceApi {
  constructor(readonly host: string, readonly port: number) {}

  httpPost<T>(request: LocationHttpMessage): Promise<T> {
    return post<LocationHttpMessage, T>(this.host, this.port, request)
  }

  list(): Promise<TypedLocation[]> {
    const payload = new ListEntries()
    return this.httpPost<TypedLocation[]>(payload)
  }
}
