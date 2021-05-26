import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'
import * as ConfigLoader from '../config/ConfigLoader'
import type { Decoder } from '../decoders/Decoder'
import { ServiceError, Subscription } from '../models'
import { APP_NAME } from './Constants'

const SERVER_ERROR = {
  code: 1011,
  status: 'Server error'
}

const createWebsocket = async (url: string) => {
  const { applicationName } = await ConfigLoader.loadAppConfig()
  const urlWithParams = new URL(url)
  urlWithParams.searchParams.set(APP_NAME, applicationName)
  return new WebSocket(urlWithParams.href)
}

export class Ws<Req> {
  private socket: Promise<WebSocket>

  constructor(url: string) {
    this.socket = new Promise(async (resolve, reject) => {
      const wss = await createWebsocket(url)
      wss.onopen = () => resolve(wss)
      wss.onerror = (event: Event) => {
        reject({ message: 'error', ...event })
        wss.close()
      }
    })
  }

  private async send(msg: Req): Promise<void> {
    return this.socket.then((wss) => wss.send(JSON.stringify(msg)))
  }

  private handleMessage = <T>(
    event: MessageEvent<any>,
    onSuccess: (msg: T) => void,
    onError: (error: ServiceError) => void = () => ({}),
    decoder?: Decoder<T>
  ) => {
    const parsedMessage = decoder
      ? E.mapLeft((e: D.DecodeError) =>
          ServiceError.make(SERVER_ERROR.code, SERVER_ERROR.status, D.draw(e))
        )(decoder.decode(JSON.parse(event.data)))
      : E.tryCatch(
          () => JSON.parse(event.data) as T,
          (error) =>
            ServiceError.make(SERVER_ERROR.code, SERVER_ERROR.status, (error as Error).message)
        )
    E.bimap(onError, onSuccess)(parsedMessage)
  }

  private subscribeOnly<T>(
    onSuccess: (msg: T) => void,
    onError: (error: ServiceError) => void = () => ({}),
    decoder?: Decoder<T>
  ): Subscription {
    this.socket.then(
      (wss) =>
        (wss.onmessage = (ev: MessageEvent<any>) =>
          this.handleMessage(ev, onSuccess, onError, decoder))
    )

    return this.subscription
  }

  subscribe<T>(
    msg: Req,
    onSuccess: (msg: T) => void,
    decoder?: Decoder<T>,
    onError?: (error: ServiceError) => void
  ): Subscription {
    this.send(msg).then(() => this.subscribeOnly(onSuccess, onError, decoder))
    return this.subscription
  }

  singleResponse<T>(msg: Req, decoder?: Decoder<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.subscribe(
        msg,
        (response: T) => resolve(response),
        decoder,
        (error) => reject(error)
      )
    })
  }

  private readonly subscription: Subscription = {
    cancel: () => this.socket.then((wss) => wss.close())
  }
}
