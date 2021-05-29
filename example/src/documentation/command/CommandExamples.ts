import type {
  OnewayResponse,
  SubmitResponse,
  Subscription,
  ValidateResponse
} from '@tmtsoftware/esw-ts'
import {
  CommandService,
  ComponentId,
  CurrentState,
  IntKey,
  Observe,
  Parameter,
  Prefix,
  ServiceError,
  Setup
} from '@tmtsoftware/esw-ts'

const auth = { token: '' }
const paramSet: Parameter<IntKey>[] = []

// @ts-ignore
//#command-service-creation
const tokenFactory = () => auth.token

const commandService: CommandService = await CommandService(
  new ComponentId(new Prefix('ESW', 'Component1'), 'HCD'),
  { tokenFactory }
)
//#command-service-creation

//#control-commands
// Definition of control command looks like following
type ControlCommand = Setup | Observe

// examples
const setupCommand: Setup = new Setup(
  new Prefix('ESW', 'Component1'),
  'move-command',
  paramSet,
  'obs-id'
)

const observeCommand: Observe = new Observe(
  new Prefix('ESW', 'Component1'),
  'c1',
  paramSet,
  'obs-id'
)

//#control-commands

//#validate

const validateResponse1: ValidateResponse = await commandService.validate(
  setupCommand
)
// or
const validateResponse2: ValidateResponse = await commandService.validate(
  observeCommand
)

//#validate

//#submit
const submitResponse1: SubmitResponse = await commandService.submit(
  setupCommand
)
// or
const submitResponse2: SubmitResponse = await commandService.submit(
  observeCommand
)

//#submit

//#oneway
const onewayResponse1: OnewayResponse = await commandService.oneway(
  setupCommand
)
// or
const onewayResponse2: OnewayResponse = await commandService.oneway(
  observeCommand
)

//#oneway

//#query
// Submit a long running command
const res: SubmitResponse = await commandService.submit(setupCommand)
// .
// .
// .
// Get the current result of long running command as :
const queryResponse: SubmitResponse = await commandService.query(res.runId)
//#query

//#query-final
// Submit a long running command
const result: SubmitResponse = await commandService.submit(setupCommand)
// .
// .
// .
// Get the final result of long running command within 10 seconds :
const queryFinalResponse: SubmitResponse = await commandService.queryFinal(
  result.runId,
  10
)
//#query-final

//#subscribe-current-state
// subscribe to this set of current states
const currentStates = new Set(['stateName1', 'stateName2'])

// this callback gets called whenever the state changes
const onStateChangeCallback = (currentState: CurrentState) => {
  // do something when state changes
  console.log('changed state:', currentState)
}
const onErrorCallback = (error: ServiceError) => {
  // do something when error occurs
  // for ex : close connection / cleanup resources
  console.log(error)
}

// subscribe call
const subscription: Subscription = await commandService.subscribeCurrentState(
  currentStates
)(onStateChangeCallback, onErrorCallback)

// .
// .
// .
// subscription can be cancelled when it is not required any more
subscription.cancel()

//#subscribe-current-state

//#submit-and-wait
// Submit a long running command and wait for the result for specific time

const submitAndWaitResponse: SubmitResponse =
  await commandService.submitAndWait(setupCommand, 10)
//#submit-and-wait

//#submit-all-and-wait
// Submit multiple commands and wait for the result of each submitted command for specific time

const submitAllAndWaitResponse: SubmitResponse[] =
  await commandService.submitAllAndWait([setupCommand, observeCommand], 10)
//#submit-all-and-wait
