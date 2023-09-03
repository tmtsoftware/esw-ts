/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Connection } from './Connection'

export class Track {
  _type: 'Track' = 'Track' as const

  constructor(readonly connection: Connection) {}
}

export type LocationWebSocketMessage = Track
