import type { Level } from './Level'
/**
 * @category Logger Service
 */
export type LogMetadata = {
  defaultLevel: Level
  akkaLevel: Level
  slf4jLevel: Level
  componentLevel: Level
}
