import { Connection } from './Connection'
import { ConnectionEncoder } from './Encoder'

export class Track extends ConnectionEncoder {
  readonly _type: 'Track' = 'Track'
  constructor(readonly connection: Connection) {
    super()
  }
}
