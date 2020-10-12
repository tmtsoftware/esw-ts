import {
  AgentService,
  GenericError,
  HttpConnection,
  KillResponse,
  Prefix,
  SpawnResponse
} from 'esw-ts'

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

//#killComponent
const componentPrefix = new Prefix('ESW', 'component1')
const httpConnection: HttpConnection = HttpConnection(
  componentPrefix,
  'SequenceComponent'
)
const killResponse: KillResponse = await agentService.killComponent(
  httpConnection
)

//#killComponent
const d = async () => {
  //#response-handling
  // common function to handle error scenario's
  const handleError = (err: Error) => {
    if (err instanceof GenericError) {
      // depending on use case, error can be handled on following fields
      //  - err.status      ( 5XX, 4XX, 3XX)
      //  - err.errorType   (AgentNotFoundException, TransportError, InternalServerError)

      switch (err.errorType) {
        case 'AgentNotFoundException':
          console.log('do something on getting AgentNotFoundException')
          break
        case 'TransportError':
          console.log('do something on getting TransportError (4XX, 3XX, etc))')
          break
        case 'InternalServerError':
          console.log(
            'do something on null pointer exception, / by zero exceptions,etc.'
          )
          break
      }
    }
  }

  // setup
  const componentPrefix = new Prefix('ESW', 'component1')
  const httpConnection: HttpConnection = HttpConnection(
    componentPrefix,
    'SequenceComponent'
  )

  // ---- spawn api example starts here ---
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

  // ---- spawn example ends here ---

  // ---- kill example starts here ---
  try {
    const killResponse: KillResponse = await agentService.killComponent(
      httpConnection
    )
    // kill response handling (200 status code)
    switch (killResponse._type) {
      case 'Killed':
        // do something on successful kill operation
        break
      case 'Failed':
        // do something on failed response
        break
    }
  } catch (err) {
    handleError(err)
  }
  // ---- kill example ends here ---

  //#response-handling
}
