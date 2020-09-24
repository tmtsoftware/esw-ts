import * as D from 'io-ts/lib/Decoder'
import type { Subscription } from '../..'
import type { Subsystem } from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import type { Ws } from '../../utils/Ws'
import type { GatewayEventPostRequest, GatewayEventWsRequest } from '../gateway/models/Gateway'
import type { Done } from '../location'
import { DoneD } from '../location/models/LocationResponses'
import type { EventService } from './EventService'
import { Event, EventD } from './models/Event'
import type { EventKey } from './models/EventKey'
import { GetEvent, PublishEvent } from './models/PostCommand'
import { Subscribe, SubscribeWithPattern } from './models/WsCommand'

export class EventServiceImpl implements EventService {
  constructor(
    private readonly httpTransport: HttpTransport<GatewayEventPostRequest>,
    private readonly ws: () => Ws<GatewayEventWsRequest>
  ) {}

  publish(event: Event): Promise<Done> {
    return this.httpTransport.requestRes(new PublishEvent(event), DoneD)
  }

  get(eventKeys: Set<EventKey>): Promise<Event[]> {
    return this.httpTransport.requestRes(new GetEvent([...eventKeys]), D.array(EventD))
  }

  subscribe(eventKeys: Set<EventKey>, maxFrequency = 0) {
    return (callback: (event: Event) => void): Subscription => {
      const subscriptionResponse = this.resolveAndSubscribe(eventKeys, maxFrequency, callback)
      return {
        cancel: async () => {
          const response = await subscriptionResponse
          return response.cancel()
        }
      }
    }
  }

  pSubscribe(subsystem: Subsystem, maxFrequency = 0, pattern = '.*') {
    return (callback: (event: Event) => void): Subscription => {
      const subscriptionResponse = this.resolveAndpSubscribe(
        subsystem,
        maxFrequency,
        pattern,
        callback
      )
      return {
        cancel: async () => {
          const response = await subscriptionResponse
          return response.cancel()
        }
      }
    }
  }

  private async resolveAndSubscribe(
    eventKeys: Set<EventKey>,
    maxFrequency: number,
    callback: (event: Event) => void
  ) {
    return this.ws().subscribe(new Subscribe([...eventKeys], maxFrequency), callback, EventD)
  }

  private async resolveAndpSubscribe(
    subsystem: Subsystem,
    maxFrequency: number,
    pattern: string,
    callback: (event: Event) => void
  ) {
    return this.ws().subscribe(
      new SubscribeWithPattern(subsystem, maxFrequency, pattern),
      callback,
      EventD
    )
  }
}
