import type { Level } from './Level'

export type LogMetadata = {
  defaultLevel: Level
  akkaLevel: Level
  slf4jLevel: Level
  componentLevel: Level
}
