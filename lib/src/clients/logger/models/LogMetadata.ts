import * as D from 'io-ts/lib/Decoder'
import { Level } from './Level'

export class LogMetadata {
  constructor(
    readonly defaultLevel: Level,
    readonly akkaLevel: Level,
    readonly slf4jLevel: Level,
    readonly componentLevel: Level
  ) {}
}

export const LogMetadataD = D.type({
  defaultLevel: Level,
  akkaLevel: Level,
  slf4jLevel: Level,
  componentLevel: Level
})
