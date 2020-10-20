import {
  AgentService,
  ComponentId,
  KillResponse,
  Prefix,
  ServiceError,
  SpawnResponse
} from '@tmtsoftware/esw-ts'

const auth = { token: '' }

//#agent-service-creation
const tokenFactory = () => auth.token

const agentService: AgentService = await AgentService(tokenFactory)
//#agent-service-creation

//#spawnSeqeunceManager
const agentPrefix = new Prefix('ESW', 'agent1')
const obsModeConfigPath = '/obs-mode.conf'
const sequenceManagerVersion = '1.0.0'

const spawnResponse1: SpawnResponse = await agentService.spawnSequenceManager(
  agentPrefix,
  obsModeConfigPath,
  false,
  sequenceManagerVersion
)
//#spawnSeqeunceManager

//#spawnSeqeunceComponent
const ocsAppVersion = '1.2.1'
const spawnResponse2: SpawnResponse = await agentService.spawnSequenceComponent(
  agentPrefix,
  'component1',
  ocsAppVersion
)
//#spawnSeqeunceComponent
//#killcomponent
const compPrefix = new Prefix('ESW', 'SomeComponent')
const componentToBeKilled = new ComponentId(compPrefix, 'Service')
const killResponse: KillResponse = await agentService.killComponent(
  componentToBeKilled
)
//#killcomponent

//#handle-error
// common function to handle error scenario's
const handleError = (err: Error) => {
  if (err instanceof ServiceError) {
    // depending on use case, error can be handled on following fields
    //  - err.status      (5XX, 4XX, 3XX)
    //  - err.errorType   (AgentNotFoundException, TransportError, ArithmeticException, NullPointerException, etc)

    // Other fields present in error model
    // err.message : contains the reason which can be used to show on UI
    // err.statusText :  Forbidden , Unauthorised, BadRequest, Not Found, etc.

    switch (err.errorType) {
      case 'AgentNotFoundException':
        console.log(err.message) // Location not found for $agentPrefix
        console.log('do something on getting AgentNotFoundException')
        break
      case 'TransportError':
        console.log(err.statusText)
        console.log('do something on getting TransportError (4XX, 3XX, etc))')
        break
      case 'ArithmeticException':
        console.log(err.statusText) // InternalServerError
        console.log(err.message) // Reason : / by zero
        break
      default:
        throw Error(err.message)
    }
  } else {
    // client side error occurred at validations and operations before making api call to the server
    // for ex: Prefix can throw runtime error if componentName is invalid.
  }
}
//#handle-error

const d = async () => {
  //#response-handling-spawn
  // setup
  const agentPrefix = new Prefix('ESW', 'agent1')
  const obsModeConfigPath = '/obs-mode.conf'
  const sequenceManagerVersion = '1.0.0'

  try {
    const spawnResponse: SpawnResponse = await agentService.spawnSequenceManager(
      agentPrefix,
      obsModeConfigPath,
      false,
      sequenceManagerVersion
    )

    // spawn response handling (200 status code)
    switch (spawnResponse._type) {
      case 'Spawned':
        // do something on successful spawn operation
        break
      case 'Failed':
        // do something on failed response
        break
    }
  } catch (err) {
    handleError(err)
  }
  //#response-handling-spawn
}
