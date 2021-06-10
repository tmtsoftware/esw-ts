import {
  AdminService,
  ComponentId,
  ContainerLifecycleState,
  Done,
  LogMetadata,
  Prefix,
  SupervisorLifecycleState
} from '@tmtsoftware/esw-ts'

//#admin-service-creation
const adminService: AdminService = await AdminService()
//#admin-service-creation

//#getLogMetadata
const prefix = new Prefix('TCS', 'filter.wheel')
const componentId = new ComponentId(prefix, 'HCD')

const logMetaData: LogMetadata = await adminService.getLogMetadata(componentId)

if (logMetaData.componentLevel !== 'ERROR') {
  const actionStatus: Done = await adminService.setLogLevel(
    componentId,
    'ERROR'
  )
}
//#getLogMetadata

//#adminActions
const restartResponse: Done = await adminService.restart(componentId)

const shutdownResponse: Done = await adminService.shutdown(componentId)

const goOfflineResponse: Done = await adminService.goOffline(componentId)

const goOnlineResponse: Done = await adminService.goOnline(componentId)
//#adminActions

//#getLifecycleState
// component lifecycle state
const response: Done = await adminService.goOnline(componentId)
if (response === 'Done') {
  const state: SupervisorLifecycleState =
    await adminService.getComponentLifecycleState(componentId)

  switch (state) {
    case 'Idle':
      break
    case 'Running':
      break
    case 'Shutdown':
      break
    default:
      console.log('unhandled state')
  }
}

// container lifecycle state
const containerPrefix = Prefix.fromString('ESW.container1')
const state: ContainerLifecycleState =
  await adminService.getContainerLifecycleState(containerPrefix)

switch (state) {
  case 'Idle':
    break
  case 'Running':
    break
}
//#getLifecycleState
