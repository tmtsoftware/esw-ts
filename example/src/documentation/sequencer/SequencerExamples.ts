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
  SequencerService,
  Setup,
  StepList,
  SubmitResponse
} from 'esw-ts'

const auth = { token: '' }

//#Sequencer-Service-creation
const tokenFactory = () => auth.token

const sequencerService: SequencerService = await SequencerService(
  new ComponentId(new Prefix('ESW', 'darknight'), 'Sequencer'),
  tokenFactory
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
const sequence = [setupCommand1, observeCommand1]
//#sequence-creation

//#loadSequence
const okOrUnhandledResponse: OkOrUnhandledResponse = await sequencerService.loadSequence(
  sequence
)
//#loadSequence

//#startSequence
const startSequenceRes: SubmitResponse = await sequencerService.startSequence()
//#startSequence

// @ts-ignore
//#add
const response: OkOrUnhandledResponse = await sequencerService.add([
  observeCommand2,
  setupCommand2
])
//#add

// @ts-ignore
//#prepend
const response: OkOrUnhandledResponse = await sequencerService.prepend([
  observeCommand2,
  setupCommand2
])
//#prepend

// @ts-ignore
//#replace
const response: GenericResponse = await sequencerService.replace(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9',
  [observeCommand2, setupCommand2]
)
//#replace

// @ts-ignore
//#insertAfter
const response: GenericResponse = await sequencerService.insertAfter(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9',
  [observeCommand2, setupCommand2]
)
//#insertAfter

// @ts-ignore
//#delete
const response: GenericResponse = await sequencerService.delete(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9'
)
//#delete

// @ts-ignore
//#addBreakpoint
const response: GenericResponse = await sequencerService.addBreakpoint(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9'
)
//#addBreakpoint

// @ts-ignore
//#removeBreakpoint
const response: RemoveBreakpointResponse = await sequencerService.removeBreakpoint(
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

// @ts-ignore
//#isAvailable
const response: boolean = await sequencerService.isAvailable()
//#isAvailable

// @ts-ignore
//#isOnline
const response: boolean = await sequencerService.isOnline()
//#isOnline

// @ts-ignore
//#goOnline
const response: GoOnlineResponse = await sequencerService.goOnline()
//#goOnline

// @ts-ignore
//#goOffline
const response: GoOfflineResponse = await sequencerService.goOffline()
//#goOffline
// @ts-ignore

//#abortSequence
const abortResponse: OkOrUnhandledResponse = await sequencerService.abortSequence()
//#abortSequence

//#stop
const stopResponse: OkOrUnhandledResponse = await sequencerService.stop()
//#stop

//#diagnosticMode
const diagnosticResponse: DiagnosticModeResponse = await sequencerService.diagnosticMode(
  new Date(),
  'engineering'
)
//#diagnosticMode

//#operationsMode
const operationsModeResponse: OperationsModeResponse = await sequencerService.operationsMode()
//#operationsMode

//#submit
const submitResponse: SubmitResponse = await sequencerService.submit(sequence)
//#submit

//#submitAndWait
const submitAndWaitResponse: SubmitResponse = await sequencerService.submitAndWait(
  sequence,
  10
)
//#submitAndWait

//#query
const queryResponse: SubmitResponse = await sequencerService.query(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9'
)
//#query

//#queryFinal
const queryFinalResponse: SubmitResponse = await sequencerService.queryFinal(
  'd99b6cf6-553c-49e9-9089-aaa494f116e9',
  10
)
//#queryFinal
