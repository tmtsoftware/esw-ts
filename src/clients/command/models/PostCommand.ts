/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ControlCommand } from '../../../models'

export type CommandServicePostMessage = Submit | Validate | Oneway | Query

export class Validate {
  _type: 'Validate' = 'Validate' as const

  constructor(readonly controlCommand: ControlCommand) {}
}

export class Submit {
  _type: 'Submit' = 'Submit' as const

  constructor(readonly controlCommand: ControlCommand) {}
}

export class Oneway {
  _type: 'Oneway' = 'Oneway' as const

  constructor(readonly controlCommand: ControlCommand) {}
}

export class Query {
  _type: 'Query' = 'Query' as const

  constructor(readonly runId: string) {}
}
