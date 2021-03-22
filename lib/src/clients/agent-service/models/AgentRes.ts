import type { ComponentId, Failed, Unhandled, LocationServiceError } from '../../../models'
import type { AkkaLocation } from '../../location'

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
 *@category Agent Service
 */
export type SequenceComponentStatus = {
  seqCompId: ComponentId
  sequencerLocation: AkkaLocation[]
}
/**
 *@category Agent Service
 */
export type AgentStatus = {
  agentId: ComponentId
  seqCompsStatus: SequenceComponentStatus[]
}

export type AgentStatusSuccess = {
  _type: 'Success'
  agentStatus: AgentStatus[]
  seqCompsWithoutAgent: SequenceComponentStatus[]
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

/**
 * @category Agent Service
 * @category Response ADT
 */
export type AgentStatusResponse = Unhandled | LocationServiceError | AgentStatusSuccess
