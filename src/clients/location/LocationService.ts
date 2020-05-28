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
import { TrackingEvent } from 'clients/location/models/TrackingEvent'
import { Track } from 'clients/location/models/WsCommand'
import { LocationConfig } from 'config/LocationConfig'
import { ComponentType } from 'models/ComponentType'
import { Prefix } from 'models/params/Prefix'
import { HttpTransport } from 'utils/HttpTransport'
import { Subscription, Ws } from 'utils/Ws'

export interface LocationServiceApi {
  list(): Promise<Location[]>
  listByComponentType(componentType: ComponentType): Promise<Location[]>
  unregister(connection: Connection): Promise<Done>
  resolve(connection: Connection, within: number): Promise<Location[]>
}

export class LocationService implements LocationServiceApi {
  private readonly httpTransport: HttpTransport<LocationHttpMessage>

  constructor(
    readonly host: string = LocationConfig.hostName,
    readonly port: number = LocationConfig.port
  ) {
    this.httpTransport = new HttpTransport(
      () => Promise.resolve({ host, port }),
      () => undefined
    )
  }

  list(): Promise<Location[]> {
    return this.httpTransport.requestRes<Location[]>(new ListEntries())
  }

  listByComponentType(componentType: ComponentType): Promise<Location[]> {
    return this.httpTransport.requestRes<Location[]>(new ListByComponentType(componentType))
  }

  listByHostname(hostname: string): Promise<Location[]> {
    return this.httpTransport.requestRes<Location[]>(new ListByHostname(hostname))
  }

  listByConnectionType(connectionType: ConnectionType): Promise<Location[]> {
    return this.httpTransport.requestRes<Location[]>(new ListByConnectionType(connectionType))
  }

  listByPrefix(prefix: Prefix): Promise<Location[]> {
    return this.httpTransport.requestRes<Location[]>(new ListByPrefix(prefix))
  }

  unregister(connection: Connection): Promise<Done> {
    return this.httpTransport.requestRes<Done>(new Unregister(connection))
  }

  //todo: decide on within parameter to be in seconds or custom time interval
  resolve(connection: Connection, withinSeconds: number): Promise<Location[]> {
    return this.httpTransport.requestRes<Location[]>(
      new Resolve(connection, `${withinSeconds} seconds`)
    )
  }

  track(connection: Connection, callBack: (trackingEvent: TrackingEvent) => void): Subscription {
    return new Ws(this.host, this.port).subscribe(new Track(connection), callBack)
  }
}
