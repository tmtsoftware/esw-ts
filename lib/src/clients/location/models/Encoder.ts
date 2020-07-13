import { Connection } from './Connection'

export abstract class ConnectionEncoder {
  abstract readonly _type: string
  abstract readonly connection: Connection

  toJSON() {
    return { _type: this._type, connection: Connection.encode(this.connection) }
  }
}
