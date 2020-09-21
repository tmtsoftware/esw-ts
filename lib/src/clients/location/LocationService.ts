import type { TokenFactory, Option } from '../..'

import { LocationConfig } from '../../config'
import type { ComponentType, Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Subscription, Ws } from '../../utils/Ws'
import { LocationServiceImpl } from './LocationServiceImpl'
import type { Connection, ConnectionType } from './models/Connection'
import type { TimeUnit } from './models/Duration'
import type { Location } from './models/Location'
import type { Done } from './models/LocationResponses'
import type { TrackingEvent } from './models/TrackingEvent'

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

export const LocationService = (
  tokenFactory: TokenFactory = () => undefined,
  locationConfig = LocationConfig
) => {
  const webSocketEndpoint = getWebSocketEndPoint({
    host: locationConfig.hostName,
    port: locationConfig.port
  })
  const postEndpoint = getPostEndPoint({
    host: locationConfig.hostName,
    port: locationConfig.port
  })
  return new LocationServiceImpl(
    new HttpTransport(postEndpoint, tokenFactory),
    () => new Ws(webSocketEndpoint)
  )
}
