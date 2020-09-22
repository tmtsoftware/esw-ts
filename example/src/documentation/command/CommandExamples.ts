import {
  CommandService,
  ComponentId,
  IntKey,
  Observe,
  Parameter,
  Prefix,
  Setup,
  SubmitResponse,
  ValidateResponse
} from 'esw-ts'

const auth = { token: '' }
const paramSet: Parameter<IntKey>[] = []
// @ts-ignor
//#Command-Service-creation
const tokenFactory = () => auth.token

const commandService: CommandService = await CommandService(
  new ComponentId(new Prefix('ESW', 'Component1'), 'HCD'),
  tokenFactory
)
//#Command-Service-creation

//#Control-commands
// Definition of control command looks like following
type ControlCommand = Setup | Observe

// examples
const setupCommand: Setup = new Setup(
  new Prefix('ESW', 'Component1'),
  'move-command',
  paramSet,
  ['obsid']
)

const observeCommand: Observe = new Observe(
  new Prefix('ESW', 'Component1'),
  'c1',
  paramSet,
  ['obsid']
)

//#Control-commands

//#validate-call

const validateResponse1: ValidateResponse = await commandService.validate(
  setupCommand
)
// or
const validateResponse2: ValidateResponse = await commandService.validate(
  observeCommand
)

//#validate-call

//#submit-call
const submitResponse1: SubmitResponse = await commandService.submit(
  setupCommand
)
// or
const submitResponse2: SubmitResponse = await commandService.submit(
  observeCommand
)

//#submit-call
