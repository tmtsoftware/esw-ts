/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'
import { getAppName } from '../config/AppName'
import type { Decoder } from '../decoders/Decoder'
import { ServiceError, Subscription } from '../models'
import { APP_NAME_PARAM, UNKNOWN_USERNAME, USERNAME_PARAM } from './Constants'

export const SERVER_ERROR = {
  code: 1011,
  status: 'Server error'
}

export const noop = () => ({})

const createWebsocket = async (url: string, username?: string) => {
  const applicationName = getAppName()
  const urlWithParams = new URL(url)
  urlWithParams.searchParams.set(APP_NAME_PARAM, applicationName)
  urlWithParams.searchParams.set(USERNAME_PARAM, username ? username : UNKNOWN_USERNAME)
  return new WebSocket(urlWithParams.href)
}

export class Ws<Req> {
  private socket: Promise<WebSocket>
  constructor(url: string, username?: string) {
    this.socket = new Promise(async (resolve, reject) => {
      const wss = await createWebsocket(url, username)
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
    onMessage: (msg: T) => void,
    onError: (error: ServiceError) => void,
    decoder?: Decoder<T>
  ) => {
    const parsedMessage = decoder
      ? E.mapLeft((e: D.DecodeError) => ServiceError.make(SERVER_ERROR.code, D.draw(e), JSON.parse(event.data)))(
          decoder.decode(JSON.parse(event.data))
        )
      : E.tryCatch(
          () => JSON.parse(event.data) as T,
          (error) => ServiceError.make(SERVER_ERROR.code, SERVER_ERROR.status, error)
        )
    E.bimap(onError, onMessage)(parsedMessage)
  }

  private subscribeOnly<T>(
    onMessage: (msg: T) => void,
    onError: (error: ServiceError) => void = noop,
    onClose: () => void = noop,
    decoder?: Decoder<T>
  ): Subscription {
    this.socket.then((wss) => {
      wss.onmessage = (ev: MessageEvent<any>) => this.handleMessage(ev, onMessage, onError, decoder)

      wss.onclose = () => onClose()
    })

    return this.subscription
  }

  subscribe<T>(
    msg: Req,
    onMessage: (msg: T) => void,
    decoder?: Decoder<T>,
    onError?: (error: ServiceError) => void,
    onClose?: () => void
  ): Subscription {
    this.send(msg).then(() => this.subscribeOnly(onMessage, onError, onClose, decoder))
    return this.subscription
  }

  singleResponse<T>(msg: Req, decoder?: Decoder<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.subscribe(msg, resolve, decoder, reject, reject)
    })
  }

  private readonly subscription: Subscription = {
    cancel: () => this.socket.then((wss) => wss.close())
  }
}
