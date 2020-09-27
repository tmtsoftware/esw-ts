import { AdminService, ComponentId, Done, LogMetadata, Prefix } from 'esw-ts'

//#admin-service-creation
const adminService: AdminService = await AdminService()
//#admin-service-creation

//#getLogMetadata
const prefix = new Prefix('TCS', 'filter.wheel')
const componentId = new ComponentId(prefix, 'HCD')
const logMetaData: LogMetadata = await adminService.getLogMetadata(componentId)
//#getLogMetadata

//#setLogLevel
const actionStatus: Done = await adminService.setLogLevel(componentId, 'WARN')
//#setLogLevel
