import type { Failed } from '../../../models'

/**
 *@category Agent Service
 */
export type Spawned = {
  _type: 'Spawned'
}
/**
 *@category Agent Service
 */
export type Killed = {
  _type: 'Killed'
}

/**
 * @category Agent Service
 * @category Response ADT
 */
export type SpawnResponse = Spawned | Failed
/**
 * @category Agent Service
 * @category Response ADT
 */
export type KillResponse = Killed | Failed
