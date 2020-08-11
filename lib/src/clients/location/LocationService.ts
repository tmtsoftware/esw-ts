import * as D from 'io-ts/lib/Decoder'
import { LocationConfig } from '../../config'
import { ComponentType, Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { Subscription, Ws } from '../../utils/Ws'
import { Connection, ConnectionType } from './models/Connection'
import { Duration, TimeUnit } from './models/Duration'
import { Location } from './models/Location'
import { Done } from './models/LocationResponses'
import * as Req from './models/PostCommand'
import { TrackingEvent } from './models/TrackingEvent'
import { LocationWebSocketMessage, Track } from './models/WsCommand'
import { getOptionValue, getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Option } from '../../utils/Option'
import { resolveGateway } from '../gateway/ResolveGateway'
import { WebSocketTransport } from '../../utils/WebSocketTransport'

export interface LocationService {
  list(): Promise<Location[]>

  listByComponentType(componentType: ComponentType): Promise<Location[]>

  listByHostname(hostname: string): Promise<Location[]>

  listByConnectionType(connectionType: ConnectionType): Promise<Location[]>

  listByPrefix(prefix: Prefix): Promise<Location[]>

  find(connection: Connection): Promise<Option<Location>>

  unregister(connection: Connection): Promise<Done>

  resolve(connection: Connection, within: number, unit: TimeUnit): Promise<Option<Location>>

  track(connection: Connection): (callBack: (trackingEvent: TrackingEvent) => void) => Subscription
}

export const LocationService = () => {
  const webSocketEndpoint = getWebSocketEndPoint({
    host: LocationConfig.hostName,
    port: LocationConfig.port
  })
  const postEndpoint = getPostEndPoint({ host: LocationConfig.hostName, port: LocationConfig.port })
  return new LocationServiceImpl(new HttpTransport(postEndpoint), () =>
    WebSocketTransport(webSocketEndpoint)
  )
}

export class LocationServiceImpl implements LocationService {
  private readonly locationListD = D.array(Location)

  constructor(
    private readonly httpTransport: HttpTransport<Req.LocationHttpMessage>,
    private readonly ws: () => Ws<LocationWebSocketMessage>
  ) {}

  list(): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListEntries(), this.locationListD)
  }

  listByComponentType(componentType: ComponentType): Promise<Location[]> {
    return this.httpTransport.requestRes(
      new Req.ListByComponentType(componentType),
      this.locationListD
    )
  }

  listByHostname(hostname: string): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByHostname(hostname), this.locationListD)
  }

  listByConnectionType(connectionType: ConnectionType): Promise<Location[]> {
    return this.httpTransport.requestRes(
      new Req.ListByConnectionType(connectionType),
      this.locationListD
    )
  }

  listByPrefix(prefix: Prefix): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByPrefix(prefix), this.locationListD)
  }

  async find(connection: Connection): Promise<Option<Location>> {
    const response = await this.httpTransport.requestRes(
      new Req.Find(connection),
      this.locationListD
    )
    return getOptionValue(response)
  }

  unregister(connection: Connection): Promise<Done> {
    return this.httpTransport.requestRes(new Req.Unregister(connection), Done)
  }

  // todo:
  // 1. decide on within withinSeconds to be in seconds or custom time interval --
  // 2. see if it can return Promise<Location>?
  // 3. add threshold check, take into consideration of http connection timeout at os/network layer --
  async resolve(connection: Connection, within: number, unit: TimeUnit): Promise<Option<Location>> {
    const response = await this.httpTransport.requestRes(
      new Req.Resolve(connection, new Duration(within, unit)),
      this.locationListD
    )
    return getOptionValue(response)
  }

  track = (connection: Connection) => (
    callBack: (trackingEvent: TrackingEvent) => void
  ): Subscription => {
    return this.ws().subscribe(new Track(connection), callBack, TrackingEvent)
  }
}
