/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { LoggingService } from './LoggingService'
import type { Level } from './models/Level'
import { Log } from './models/PostCommand'
import { DoneD } from '../../decoders/CommonDecoders'
import type { Done, Prefix } from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import type { GatewayLoggingPostRequest } from '../gateway/models/Gateway'

export class LoggingServiceImpl implements LoggingService {
  constructor(private readonly httpTransport: HttpTransport<GatewayLoggingPostRequest>) {}

  log(prefix: Prefix, level: Level, message: string, metadata?: Record<string, any>): Promise<Done> {
    return this.httpTransport.requestRes(new Log(prefix, level, message, metadata ? metadata : {}), DoneD)
  }
}
