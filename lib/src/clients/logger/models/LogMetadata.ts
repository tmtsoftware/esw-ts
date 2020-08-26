import * as D from 'io-ts/lib/Decoder'
import { Level } from './Level'

export const LogMetadataD = D.type({
  defaultLevel: Level,
  akkaLevel: Level,
  slf4jLevel: Level,
  componentLevel: Level
})

export type LogMetadata = D.TypeOf<typeof LogMetadataD>
