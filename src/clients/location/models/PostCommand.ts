import type { ComponentType, Prefix } from '../../../models'
import type { Connection, ConnectionType } from './Connection'
import type { Duration } from './Duration'

export class ListEntries {
  readonly _type: 'ListEntries' = 'ListEntries'
}

export class ListByComponentType {
  readonly _type: 'ListByComponentType' = 'ListByComponentType'

  constructor(readonly componentType: ComponentType) {}
}

export class ListByHostname {
  readonly _type: 'ListByHostname' = 'ListByHostname'

  constructor(readonly hostname: string) {}
}

export class ListByConnectionType {
  readonly _type: 'ListByConnectionType' = 'ListByConnectionType'

  constructor(readonly connectionType: ConnectionType) {}
}

export class ListByPrefix {
  readonly _type: 'ListByPrefix' = 'ListByPrefix'

  constructor(readonly prefix: Prefix) {}
}

export class Find {
  readonly _type: 'Find' = 'Find'

  constructor(readonly connection: Connection) {}
}

export class Unregister {
  readonly _type: 'Unregister' = 'Unregister'

  constructor(readonly connection: Connection) {}
}

export class Resolve {
  readonly _type: 'Resolve' = 'Resolve'

  constructor(readonly connection: Connection, readonly within: Duration) {}
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
