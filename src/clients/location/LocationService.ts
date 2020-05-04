import { Connection, ConnectionType } from 'clients/location/models/Connection'
import { Location } from 'clients/location/models/Location'
import { Done } from 'clients/location/models/LocationResponses'
import {
  ListByComponentType,
  ListByConnectionType,
  ListByHostname,
  ListByPrefix,
  ListEntries,
  LocationHttpMessage,
  Resolve,
  Unregister
} from 'clients/location/models/PostCommand'
import { post } from 'utils/Http'
import { ComponentType } from 'models/ComponentType'
import { Prefix } from 'models/params/Prefix'

export interface LocationServiceApi {
  list(): Promise<Location[]>
  listByComponentType(componentType: ComponentType): Promise<Location[]>
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

  listByComponentType(componentType: ComponentType): Promise<Location[]> {
    return this.httpPost<Location[]>(new ListByComponentType(componentType))
  }

  listByHostname(hostname: string): Promise<Location[]> {
    return this.httpPost<Location[]>(new ListByHostname(hostname))
  }

  listByConnectionType(connectionType: ConnectionType): Promise<Location[]> {
    return this.httpPost<Location[]>(new ListByConnectionType(connectionType))
  }

  listByPrefix(prefix: Prefix): Promise<Location[]> {
    return this.httpPost<Location[]>(new ListByPrefix(prefix))
  }

  unregister(connection: Connection): Promise<Done> {
    return this.httpPost<Done>(new Unregister(connection))
  }

  //todo: decide on within parameter to be in seconds or custom time interval
  resolve(connection: Connection, within: number): Promise<Location[]> {
    return this.httpPost<Location[]>(new Resolve(connection, `${within} seconds`))
  }
}
