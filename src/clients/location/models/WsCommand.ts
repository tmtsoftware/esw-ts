/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Connection } from './Connection'

export class Track {
  readonly _type: 'Track' = 'Track'

  constructor(readonly connection: Connection) {}
}

export type LocationWebSocketMessage = Track
