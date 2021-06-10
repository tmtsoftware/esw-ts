import type { Option, Subscription } from '../..'
import { DoneD } from '../../decoders/CommonDecoders'
import { LocationListD, TrackingEventD } from '../../decoders/LocationDecoders'
import type { ComponentType, Done, Prefix, ServiceError } from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import { headOption } from '../../utils/Utils'
import type { Ws } from '../../utils/Ws'
import type { LocationService } from './LocationService'
import type { Connection, ConnectionType } from './models/Connection'
import { Duration, TimeUnit } from './models/Duration'
import type { Location } from './models/Location'
import * as Req from './models/PostCommand'
import type { TrackingEvent } from './models/TrackingEvent'
import { LocationWebSocketMessage, Track } from './models/WsCommand'

export class LocationServiceImpl implements LocationService {
  constructor(
    private readonly httpTransport: HttpTransport<Req.LocationHttpMessage>,
    private readonly ws: () => Ws<LocationWebSocketMessage>
  ) {}

  list(): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListEntries(), LocationListD)
  }

  listByComponentType(componentType: ComponentType): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByComponentType(componentType), LocationListD)
  }

  listByHostname(hostname: string): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByHostname(hostname), LocationListD)
  }

  listByConnectionType(connectionType: ConnectionType): Promise<Location[]> {
    return this.httpTransport.requestRes(
      new Req.ListByConnectionType(connectionType),
      LocationListD
    )
  }

  listByPrefix(prefix: Prefix): Promise<Location[]> {
    return this.httpTransport.requestRes(new Req.ListByPrefix(prefix), LocationListD)
  }

  async find(connection: Connection): Promise<Option<Location>> {
    const response = await this.httpTransport.requestRes(new Req.Find(connection), LocationListD)
    return headOption(response)
  }

  unregister(connection: Connection): Promise<Done> {
    return this.httpTransport.requestRes(new Req.Unregister(connection), DoneD)
  }

  async resolve(connection: Connection, within: number, unit: TimeUnit): Promise<Option<Location>> {
    const response = await this.httpTransport.requestRes(
      new Req.Resolve(connection, new Duration(within, unit)),
      LocationListD
    )
    return headOption(response)
  }

  track(connection: Connection) {
    return (
      onMessage: (trackingEvent: TrackingEvent) => void,
      onError?: (error: ServiceError) => void
    ): Subscription =>
      this.ws().subscribe(new Track(connection), onMessage, TrackingEventD, onError)
  }
}
