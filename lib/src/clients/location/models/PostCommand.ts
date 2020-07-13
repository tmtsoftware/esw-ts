import { Connection, ConnectionType } from './Connection'
import { ComponentType, Prefix, PrefixV } from '../../../models'
import { Duration } from './Duration'
import { ConnectionEncoder } from './Encoder'

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

  toJSON() {
    return { _type: this._type, prefix: PrefixV.encode(this.prefix) }
  }
}

export class Find extends ConnectionEncoder {
  readonly _type: 'Find' = 'Find'
  constructor(readonly connection: Connection) {
    super()
  }
}

export class Unregister extends ConnectionEncoder {
  readonly _type: 'Unregister' = 'Unregister'
  constructor(readonly connection: Connection) {
    super()
  }
}

export class Resolve extends ConnectionEncoder {
  readonly _type: 'Resolve' = 'Resolve'
  constructor(readonly connection: Connection, readonly within: Duration) {
    super()
  }

  toJSON() {
    const json = super.toJSON()
    return { ...json, within: this.within }
  }
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
