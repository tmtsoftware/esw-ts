import * as D from 'io-ts/lib/Decoder'
import { LevelD } from './Level'

export const LogMetadataD = D.type({
  defaultLevel: LevelD,
  akkaLevel: LevelD,
  slf4jLevel: LevelD,
  componentLevel: LevelD
})

export type LogMetadata = D.TypeOf<typeof LogMetadataD>
