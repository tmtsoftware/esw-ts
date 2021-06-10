import type { Level } from './Level'

/**
 * Holds metadata information about logging configuration
 * @category Logger Service
 */
export type LogMetadata = {
  defaultLevel: Level
  akkaLevel: Level
  slf4jLevel: Level
  componentLevel: Level
}
