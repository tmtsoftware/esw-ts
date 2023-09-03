/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Connection, ConnectionType } from './Connection'
import type { Duration } from './Duration'
import type { ComponentType, Prefix } from '../../../models'

export class ListEntries {
  _type: 'ListEntries' = 'ListEntries' as const
}

export class ListByComponentType {
  _type: 'ListByComponentType' = 'ListByComponentType' as const

  constructor(readonly componentType: ComponentType) {}
}

export class ListByHostname {
  _type: 'ListByHostname' = 'ListByHostname' as const

  constructor(readonly hostname: string) {}
}

export class ListByConnectionType {
  _type: 'ListByConnectionType' = 'ListByConnectionType' as const

  constructor(readonly connectionType: ConnectionType) {}
}

export class ListByPrefix {
  _type: 'ListByPrefix' = 'ListByPrefix' as const

  constructor(readonly prefix: Prefix) {}
}

export class Find {
  _type: 'Find' = 'Find' as const

  constructor(readonly connection: Connection) {}
}

export class Unregister {
  _type: 'Unregister' = 'Unregister' as const

  constructor(readonly connection: Connection) {}
}

export class Resolve {
  _type: 'Resolve' = 'Resolve' as const

  constructor(
    readonly connection: Connection,
    readonly within: Duration
  ) {}
}

export type LocationHttpMessage =
  | ListEntries
  | Unregister
  | Resolve
  | ListByComponentType
  | ListByHostname
  | ListByConnectionType
  | ListByPrefix
  | Find
