/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Event } from './Event'
import type { EventKey } from './EventKey'

export class PublishEvent {
  _type: 'PublishEvent' = 'PublishEvent' as const

  constructor(readonly event: Event) {}
}

export class GetEvent {
  _type: 'GetEvent' = 'GetEvent' as const

  constructor(readonly eventKeys: EventKey[]) {}
}
