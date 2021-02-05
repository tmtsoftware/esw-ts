export type ContainerLifecycleState = 'Idle' | 'Running'
export type SupervisorLifecycleState =
  | 'Idle'
  | 'Running'
  | 'RunningOffline'
  | 'Restart'
  | 'Shutdown'
  | 'Lock'
