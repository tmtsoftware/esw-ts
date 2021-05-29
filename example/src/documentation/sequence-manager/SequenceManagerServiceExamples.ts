import {
  AgentProvisionConfig,
  AgentStatusResponse,
  ConfigureResponse,
  ObsMode,
  Prefix,
  ProvisionConfig,
  ProvisionResponse,
  RestartSequencerResponse,
  SequenceManagerService,
  ShutdownSequenceComponentResponse,
  ShutdownSequencersResponse,
  StartSequencerResponse,
  ObsModesDetailsResponse,
  ResourcesStatusResponse
} from '@tmtsoftware/esw-ts'

const auth = { token: '' }

// #sequence-manager-service-creation
const tokenFactory = () => auth.token
const sequenceManagerService: SequenceManagerService =
  await SequenceManagerService({ tokenFactory })
// #sequence-manager-service-creation

//#configure
const obsMode = new ObsMode('IRIS_DarkNight')
const configureResponse: ConfigureResponse =
  await sequenceManagerService.configure(obsMode)
//#configure

//#provision
const eswAgentPrefix = new Prefix('ESW', 'agent-machine')
const irisAgentPrefix = new Prefix('IRIS', 'agent-machine')
const eswAgentProvisionConfig = new AgentProvisionConfig(eswAgentPrefix, 3)
const irisAgentProvisionConfig = new AgentProvisionConfig(irisAgentPrefix, 2)
const provisionConfig = new ProvisionConfig([
  eswAgentProvisionConfig,
  irisAgentProvisionConfig
])

const provision: ProvisionResponse = await sequenceManagerService.provision(
  provisionConfig
)
//#provision

//#getObsModesDetails
const obsModesDetailsResponse: ObsModesDetailsResponse =
  await sequenceManagerService.getObsModesDetails()
//#getObsModesDetails

//#startSequencer
const startSequencerResponse: StartSequencerResponse =
  await sequenceManagerService.startSequencer('IRIS', obsMode)
//#startSequencer

//#restartSequencer
const restartSequencerResponse: RestartSequencerResponse =
  await sequenceManagerService.restartSequencer('IRIS', obsMode)
//#restartSequencer

//#shutdownSequencer
const shutdownSequencerResponse: ShutdownSequencersResponse =
  await sequenceManagerService.shutdownSequencer('IRIS', obsMode)

//#shutdownSequencer

//#shutdownSubsystemSequencers
const shutdownSubsystemSeqResponse: ShutdownSequencersResponse =
  await sequenceManagerService.shutdownSubsystemSequencers('IRIS')
//#shutdownSubsystemSequencers

//#shutdownObsModeSequencers
const shutdownObsModeSeqResponse: ShutdownSequencersResponse =
  await sequenceManagerService.shutdownObsModeSequencers(obsMode)
//#shutdownObsModeSequencers

//#shutdownAllSequencers
const shutdownAllSequencersResponse: ShutdownSequencersResponse =
  await sequenceManagerService.shutdownAllSequencers()
//#shutdownAllSequencers

//#shutdownSequenceComponent
const seqCompPrefix = new Prefix('ESW', 'ESW.ESW_1')
const shutdownSeqCompResponse: ShutdownSequenceComponentResponse =
  await sequenceManagerService.shutdownSequenceComponent(seqCompPrefix)
//#shutdownSequenceComponent

//#shutdownAllSequenceComponents
const shutdownAllSeqCompResponse: ShutdownSequenceComponentResponse =
  await sequenceManagerService.shutdownAllSequenceComponents()
//#shutdownAllSequenceComponents

//#getResources
const resourcesStatus: ResourcesStatusResponse =
  await sequenceManagerService.getResources()
//#getResources
