import {
  AgentService,
  CommandService,
  ComponentId,
  Prefix,
  ServiceError,
  Setup,
  SpawnResponse,
  SubmitResponse
} from '@tmtsoftware/esw-ts'

const someService = {
  api: () => {}
}
const auth = { token: '' }

const tokenFactory = () => auth.token

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
  const agentService: AgentService = await AgentService({ tokenFactory })

  const agentPrefix = new Prefix('ESW', 'agent1')
  const obsModeConfigPath = '/obs-mode.conf'
  const sequenceManagerVersion = '1.0.0'

  try {
    const spawnResponse: SpawnResponse =
      await agentService.spawnSequenceManager(
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

//#client-side-error
const prefix = new Prefix('ESW', 'filter-wheel')
//#client-side-error

const ddd = async () => {
  //#response-handling
  // response handlers
  const onCancelled = () => {
    // do something on receiving Cancelled type
  }
  const onCompleted = () => {
    // do something on receiving Completed type
  }
  const onStarted = () => {
    // do something on receiving Started type
  }
  const onError = () => {
    // do something on receiving Error type
  }
  const onInvalid = () => {
    // do something on receiving Invalid type
  }
  const onLocked = () => {
    // do something on receiving Locked type
  }

  const prefix = new Prefix('ESW', 'component_1')
  const componentId = new ComponentId(prefix, 'Assembly')
  const commandService: CommandService = await CommandService(componentId, {
    tokenFactory
  })

  const setup = new Setup(prefix, 'move', [])
  const submitResponse: SubmitResponse = await commandService.submit(setup)

  // Handle all variations (Exhaustive switch pattern)
  switch (submitResponse._type) {
    case 'Cancelled':
      onCancelled()
      break
    case 'Completed':
      onCompleted()
      break
    case 'Started':
      onStarted()
      break
    case 'Error':
      onError()
      break
    case 'Invalid':
      onInvalid()
      break
    case 'Locked':
      onLocked()
      break
  }

  // or handle few types

  switch (submitResponse._type) {
    case 'Completed':
      onCompleted()
      break
    case 'Started':
      onStarted()
      break
    case 'Error':
      onError()
      break
    default: // !!important!!
    // do something by default for other cases
  }

  //#response-handling
}
