import type { Connection } from './Connection'

export class Track {
  readonly _type: 'Track' = 'Track'

  constructor(readonly connection: Connection) {}
}

export type LocationWebSocketMessage = Track
