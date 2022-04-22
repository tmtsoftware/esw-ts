/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Prefix } from '../../../models'
import type { EventName } from './EventName'

/**
 * @category Event Service
 */
export class EventKey {
  constructor(readonly source: Prefix, readonly eventName: EventName) {}
}
