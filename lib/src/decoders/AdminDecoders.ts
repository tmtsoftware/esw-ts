import type { ContainerLifecycleState, SupervisorLifecycleState } from '../models'
import { ciLiteral, Decoder } from './Decoder'

export const SupervisorLifecycleStateD: Decoder<SupervisorLifecycleState> = ciLiteral(
  'Idle',
  'Running',
  'RunningOffline',
  'Restart',
  'Shutdown',
  'Lock'
)
export const ContainerLifecycleStateD: Decoder<ContainerLifecycleState> = ciLiteral(
  'Idle',
  'Running'
)
