/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeaderExt } from './HeaderExt'
import { post } from './Http'
import { getOrThrow } from './Utils'
import type { Decoder } from '../decoders/Decoder'
import type { AuthData } from '../models'

export class HttpTransport<Req> {
  constructor(
    readonly url: string,
    readonly authData?: AuthData
  ) {}

  async requestRes<Res>(request: Req, decoder: Decoder<Res>, timeoutInMillis?: number): Promise<Res> {
    const token = this.authData?.tokenFactory?.()
    const headers = new HeaderExt()
      .withContentType('application/json')
      .withAuthorization(token)
      .withUsername(this.authData?.username)
    return post<Req, Res>({
      headers,
      url: this.url,
      payload: request,
      timeout: timeoutInMillis,
      decoder: decoder ? (obj) => getOrThrow(decoder.decode(obj)) : decoder
    })
  }
}
