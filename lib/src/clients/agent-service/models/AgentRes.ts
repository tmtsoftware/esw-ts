import type { Failed } from '../../../models'

/**
 *@category Child Response
 */
export type Spawned = {
  _type: 'Spawned'
}
/**
 *@category Child Response
 */
export type Killed = {
  _type: 'Killed'
}

/**
 * @category Response ADT
 */
export type SpawnResponse = Spawned | Failed
/**
 * @category Response ADT
 */
export type KillResponse = Killed | Failed
