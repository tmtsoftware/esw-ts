import { HttpTransport } from '../../utils/HttpTransport'
import { GatewayEventPostRequest, GatewayEventWsRequest } from '../gateway/models/Gateway'
import { Subscription, Ws } from '../../utils/Ws'
import { Event } from './models/Event'
import { Done } from '../location'
import { GetEvent, PublishEvent } from './models/PostCommand'
import { EventKey } from './models/EventKey'
import * as D from 'io-ts/lib/Decoder'
import { Subsystem } from '../../models'
import { Subscribe, SubscribeWithPattern } from './models/WsCommand'
import { EventService } from './EventService'

export class EventServiceImpl implements EventService {
  constructor(
    private readonly httpTransport: HttpTransport<GatewayEventPostRequest>,
    private readonly ws: () => Ws<GatewayEventWsRequest>
  ) {}

  publish(event: Event): Promise<Done> {
    return this.httpTransport.requestRes(new PublishEvent(event), Done)
  }

  get(eventKeys: Set<EventKey>): Promise<Event[]> {
    return this.httpTransport.requestRes(new GetEvent([...eventKeys]), D.array(Event))
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
    return this.ws().subscribe(new Subscribe([...eventKeys], maxFrequency), callback, Event)
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
      Event
    )
  }
}
