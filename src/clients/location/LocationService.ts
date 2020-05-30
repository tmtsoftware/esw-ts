import { Connection, ConnectionType } from 'clients/location/models/Connection'
import { Location } from 'clients/location/models/Location'
import { Done } from 'clients/location/models/LocationResponses'
import * as Req from 'clients/location/models/PostCommand'
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
  listByHostname(hostname: string): Promise<Location[]>
  listByConnectionType(connectionType: ConnectionType): Promise<Location[]>
  listByPrefix(prefix: Prefix): Promise<Location[]>
  unregister(connection: Connection): Promise<Done>
  resolve(connection: Connection, withinSeconds: number): Promise<Location[]>
  track(connection: Connection, callBack: (trackingEvent: TrackingEvent) => void): Subscription
}

export class LocationService implements LocationServiceApi {
  private readonly httpTransport: HttpTransport<Req.LocationHttpMessage>

  constructor(
    readonly host: string = LocationConfig.hostName,
    readonly port: number = LocationConfig.port
  ) {
    this.httpTransport = new HttpTransport(() => Promise.resolve({ host, port }))
  }

  list(): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListEntries())
  }

  listByComponentType(componentType: ComponentType): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByComponentType(componentType))
  }

  listByHostname(hostname: string): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByHostname(hostname))
  }

  listByConnectionType(connectionType: ConnectionType): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByConnectionType(connectionType))
  }

  listByPrefix(prefix: Prefix): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByPrefix(prefix))
  }

  unregister(connection: Connection): Promise<Done> {
    return this.httpTransport.requestRes(new Req.Unregister(connection))
  }

  //todo: decide on within parameter to be in seconds or custom time interval
  // add threshold check, take into consideration of http connection timeout at os/network layer
  resolve(connection: Connection, withinSeconds: number): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.Resolve(connection, `${withinSeconds} seconds`))
  }

  track(connection: Connection, callBack: (trackingEvent: TrackingEvent) => void): Subscription {
    return new Ws(this.host, this.port).subscribe(new Track(connection), callBack)
  }
}
