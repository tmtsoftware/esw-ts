import * as D from 'io-ts/lib/Decoder'
import { Level } from './Level'

export type LogMetadata = D.TypeOf<typeof LogMetadataD>

export const LogMetadataD = D.type({
  defaultLevel: Level,
  akkaLevel: Level,
  slf4jLevel: Level,
  componentLevel: Level
})
