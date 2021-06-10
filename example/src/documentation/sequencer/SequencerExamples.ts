import {
  ComponentId,
  DiagnosticModeResponse,
  GenericResponse,
  GoOfflineResponse,
  GoOnlineResponse,
  Observe,
  OkOrUnhandledResponse,
  OperationsModeResponse,
  Option,
  PauseResponse,
  Prefix,
  RemoveBreakpointResponse,
  Sequence,
  SequencerService,
  SequencerState,
  SequencerStateResponse,
  ServiceError,
  Setup,
  StepList,
  SubmitResponse,
  Subscription
} from '@tmtsoftware/esw-ts'

const auth = { token: '' }

//#Sequencer-Service-creation
const tokenFactory = () => auth.token

const sequencerService: SequencerService = await SequencerService(
  new ComponentId(new Prefix('ESW', 'darknight'), 'Sequencer'),
  { tokenFactory }
)
//#Sequencer-Service-creation

//#sequence-commands-creation
const eswTestPrefix = Prefix.fromString('TCS.darknight')

const setupCommand1 = new Setup(eswTestPrefix, 'setup-command1')
const setupCommand2 = new Setup(eswTestPrefix, 'setup-command2')

const observeCommand1 = new Observe(eswTestPrefix, 'observe-command1')
const observeCommand2 = new Observe(eswTestPrefix, 'observe-command2')
//#sequence-commands-creation

//#sequence-creation
//sequence is a list of SequenceCommand
const sequence = new Sequence([setupCommand1, observeCommand1])
//#sequence-creation

//#loadSequence
const okOrUnhandledResponse: OkOrUnhandledResponse =
  await sequencerService.loadSequence(sequence)
const initialResponse: SubmitResponse = await sequencerService.startSequence()

const queryResponse: SubmitResponse = await sequencerService.query(
  initialResponse.runId
)
const queryFinalResponse: SubmitResponse = await sequencerService.queryFinal(
  initialResponse.runId,
  5
)
//#loadSequence

//#add
const addResponse: OkOrUnhandledResponse = await sequencerService.add([
  observeCommand2,
  setupCommand2
])
//#add

//#prepend
const prependResponse: OkOrUnhandledResponse = await sequencerService.prepend([
  observeCommand2,
  setupCommand2
])
//#prepend

//#replace
const replaceResponse: GenericResponse = await sequencerService.replace(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9',
  [observeCommand2, setupCommand2]
)
//#replace

//#insertAfter
const insertAfterResponse: GenericResponse = await sequencerService.insertAfter(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9',
  [observeCommand2, setupCommand2]
)
//#insertAfter

//#delete
const deleteResponse: GenericResponse = await sequencerService.delete(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9'
)
//#delete

//#addBreakpoint
const addBreakpointResponse: GenericResponse =
  await sequencerService.addBreakpoint('d99b6cf6-553c-49e9-9089-aaa494f116e9')
//#addBreakpoint

//#removeBreakpoint
const removeBreakpointResponse: RemoveBreakpointResponse =
  await sequencerService.removeBreakpoint(
    'd99b6cf6-553c-49e9-9089-aaa494f116e9'
  )
//#removeBreakpoint

//#reset
const resetResponse: OkOrUnhandledResponse = await sequencerService.reset()
//#reset

//#resume
const resumeResponse: OkOrUnhandledResponse = await sequencerService.resume()
//#resume

//#pause
const pauseResponse: PauseResponse = await sequencerService.pause()
//#pause

//#getSequence
const getSequenceRes: Option<StepList> = await sequencerService.getSequence()
//#getSequence

//#isAvailable
const isAvailable: boolean = await sequencerService.isAvailable()
//#isAvailable

//#isOnline
const isOnline: boolean = await sequencerService.isOnline()
//#isOnline

//#goOnline
const goOnlineResponse: GoOnlineResponse = await sequencerService.goOnline()
//#goOnline

//#goOffline
const goOfflineResponse: GoOfflineResponse = await sequencerService.goOffline()
//#goOffline

//#abortSequence
const abortResponse: OkOrUnhandledResponse =
  await sequencerService.abortSequence()
//#abortSequence

//#stop
const stopResponse: OkOrUnhandledResponse = await sequencerService.stop()
//#stop

//#diagnosticMode
const diagnosticResponse: DiagnosticModeResponse =
  await sequencerService.diagnosticMode(new Date(), 'engineering')
//#diagnosticMode

//#operationsMode
const operationsModeResponse: OperationsModeResponse =
  await sequencerService.operationsMode()
//#operationsMode

//#submit
const initialRes: SubmitResponse = await sequencerService.submit(sequence)

const queryRes: SubmitResponse = await sequencerService.query(initialRes.runId)

const queryFinalRes: SubmitResponse = await sequencerService.queryFinal(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9',
  10
)
//#submit

//#submitAndWait
const submitAndWaitResponse: SubmitResponse =
  await sequencerService.submitAndWait(sequence, 10)
//#submitAndWait

//#getSequencerState
const getSequencerState: SequencerState =
  await sequencerService.getSequencerState()
//#getSequencerState
//

// #subscribeSequencerState
const callBack = (sequencerStateResponse: SequencerStateResponse) => {
  console.log(sequencerStateResponse)
}
const onErrorCallback = (error: ServiceError) => {
  // do something when error occurs
  // for ex : close connection / cleanup resources
  console.log(error)
}
const subscription: Subscription = sequencerService.subscribeSequencerState()(
  callBack,
  onErrorCallback
)
//...
subscription.cancel() // to unsubscribe
//#subscribeSequencerState
