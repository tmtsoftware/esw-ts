/**
 * Lifecycle state of a container actor
 * @category Common
 */
export type ContainerLifecycleState = 'Idle' | 'Running'
/**
 * Lifecycle state of a Supervisor actor
 * @category Common
 */
export type SupervisorLifecycleState =
  | 'Idle'
  | 'Running'
  | 'RunningOffline'
  | 'Restart'
  | 'Shutdown'
  | 'Lock'
