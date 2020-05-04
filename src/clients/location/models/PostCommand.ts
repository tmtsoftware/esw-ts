import { Registration } from 'clients/location/models/Registration'
import { Connection, ConnectionType } from 'clients/location/models/Connection'
import { ComponentType } from 'models/ComponentType'
import { Prefix } from 'models/params/Prefix'

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

export class Register {
  readonly _type: 'Register' = 'Register'
  constructor(readonly registration: Registration) {}
}

export class Unregister {
  readonly _type: 'Unregister' = 'Unregister'
  constructor(readonly connection: Connection) {}
}

export class Resolve {
  readonly _type: 'Resolve' = 'Resolve'
  constructor(readonly connection: Connection, readonly within: string) {}
}

export type LocationHttpMessage =
  | ListEntries
  | Register
  | Unregister
  | Resolve
  | ListByComponentType
  | ListByHostname
  | ListByConnectionType
  | ListByPrefix
