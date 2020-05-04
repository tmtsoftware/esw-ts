import { Connection } from 'clients/location/models/Connection'

export class Track {
  readonly _type: 'Track' = 'Track'
  constructor(readonly connection: Connection) {}
}
