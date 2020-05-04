import { Registration } from 'clients/location/models/Registration'
import { Connection } from 'clients/location/models/Connection'

export class ListEntries {
  readonly _type: 'ListEntries' = 'ListEntries'
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

export type LocationHttpMessage = ListEntries | Register | Unregister | Resolve
