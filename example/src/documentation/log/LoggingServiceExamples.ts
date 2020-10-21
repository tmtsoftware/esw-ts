import {
  CommandService,
  ComponentId,
  intKey,
  LocationService,
  LoggingService,
  Prefix,
  Setup
} from '@tmtsoftware/esw-ts'

//#logging-service-creation
const loggingService: LoggingService = await LoggingService()
const locationService: LocationService = await LocationService()
//#logging-service-creation

const dd = async () => {
  //#logentry
  let prefix = new Prefix('ESW', 'comp1')
  const commandService: CommandService = await CommandService(
    new ComponentId(prefix, 'Assembly')
  )
  const intParam = intKey('positions').set([1, 2, 3])
  const setup = new Setup(prefix, 'move', [intParam])
  const response = await commandService.submit(setup)
  switch (response._type) {
    case 'Completed':
      await loggingService.log(
        prefix,
        'INFO',
        'Successfully submitted move command',
        { params: [intParam] }
      )
      break
    default:
      await loggingService.log(
        prefix,
        'ERROR',
        'Failed to submit move command',
        { params: [intParam] }
      )
  }
  //#logentry
}
