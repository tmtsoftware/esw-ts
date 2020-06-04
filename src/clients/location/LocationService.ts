import { Connection, ConnectionType } from './models/Connection'
import { Location } from './models/Location'
import { Done } from './models/LocationResponses'
import * as Req from './models/PostCommand'
import { TrackingEvent } from './models/TrackingEvent'
import { Track } from './models/WsCommand'
import { LocationConfig } from '../../config'
import { ComponentType, Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { Subscription, Ws } from '../../utils/Ws'

// fixme: find API missing?
export interface LocationServiceApi {
  list(): Promise<Location[]>
  listByComponentType(componentType: ComponentType): Promise<Location[]>
  listByHostname(hostname: string): Promise<Location[]>
  listByConnectionType(connectionType: ConnectionType): Promise<Location[]>
  listByPrefix(prefix: Prefix): Promise<Location[]>
  find(connection: Connection): Promise<Location>
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

  find(connection: Connection): Promise<Location> {
    return this.httpTransport.requestRes(new Req.Find(connection))
  }

  unregister(connection: Connection): Promise<Done> {
    return this.httpTransport.requestRes(new Req.Unregister(connection))
  }

  // todo:
  // 1. decide on within withinSeconds to be in seconds or custom time interval
  // 2. see if it can return Promise<Location>?
  // 3. add threshold check, take into consideration of http connection timeout at os/network layer
  resolve(connection: Connection, withinSeconds: number): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.Resolve(connection, `${withinSeconds} seconds`))
  }

  track(connection: Connection, callBack: (trackingEvent: TrackingEvent) => void): Subscription {
    return new Ws(this.host, this.port).subscribe(new Track(connection), callBack)
  }
}
