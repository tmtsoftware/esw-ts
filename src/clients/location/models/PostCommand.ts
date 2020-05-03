import { Connection } from 'clients/location/models/Connection'

export class ListEntries {
  readonly _type: 'ListEntries' = 'ListEntries'
}

export class Unregister {
  readonly _type: 'Unregister' = 'Unregister'
  constructor(readonly connection: Connection) {}
}
export type LocationHttpMessage = ListEntries | Unregister
