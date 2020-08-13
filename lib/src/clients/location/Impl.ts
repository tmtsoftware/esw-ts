import { HttpTransport } from '../../utils/HttpTransport'
import * as Req from './models/PostCommand'
import { Subscription, Ws } from '../../utils/Ws'
import { LocationWebSocketMessage, Track } from './models/WsCommand'
import { Location } from './models/Location'
import { Done, LocationList } from './models/LocationResponses'
import { ComponentType, Prefix } from '../../models'
import { Connection, ConnectionType } from './models/Connection'
import { Option } from '../../utils/Option'
import { headOption } from '../../utils/Utils'
import { Duration, TimeUnit } from './models/Duration'
import { TrackingEvent } from './models/TrackingEvent'
import { LocationService } from './LocationService'

export class LocationServiceImpl implements LocationService {
  constructor(
    private readonly httpTransport: HttpTransport<Req.LocationHttpMessage>,
    private readonly ws: () => Ws<LocationWebSocketMessage>
  ) {}

  list(): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListEntries(), LocationList)
  }

  listByComponentType(componentType: ComponentType): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByComponentType(componentType), LocationList)
  }

  listByHostname(hostname: string): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByHostname(hostname), LocationList)
  }

  listByConnectionType(connectionType: ConnectionType): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByConnectionType(connectionType), LocationList)
  }

  listByPrefix(prefix: Prefix): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByPrefix(prefix), LocationList)
  }

  async find(connection: Connection): Promise<Option<Location>> {
    const response = await this.httpTransport.requestRes(new Req.Find(connection), LocationList)
    return headOption(response)
  }

  unregister(connection: Connection): Promise<Done> {
    return this.httpTransport.requestRes(new Req.Unregister(connection), Done)
  }

  async resolve(connection: Connection, within: number, unit: TimeUnit): Promise<Option<Location>> {
    const response = await this.httpTransport.requestRes(
      new Req.Resolve(connection, new Duration(within, unit)),
      LocationList
    )
    return headOption(response)
  }

  track = (connection: Connection) => (
    callBack: (trackingEvent: TrackingEvent) => void
  ): Subscription => {
    return this.ws().subscribe(new Track(connection), callBack, TrackingEvent)
  }
}
