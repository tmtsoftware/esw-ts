import {
  CommandService,
  ComponentId,
  Observe,
  Prefix,
  Setup,
  ValidateResponse
} from 'esw-ts'

// @ts-ignore
//#Command-Service-creation
const commandService: CommandService = await CommandService(
  new ComponentId(new Prefix('ESW', 'Component1'), 'HCD')
)
//#Command-Service-creation

//#Control-commands
// Definition of control command looks like following
type ControlCommand = Setup | Observe

// examples
const setupCommand: Setup = new Setup(new Prefix('ESW', 'Component1'), 'c1', [])

const observeCommand: Observe = new Observe(
  new Prefix('ESW', 'Component1'),
  'c1',
  []
)

//#Control-commands

//#validate-call

const response1: ValidateResponse = await commandService.validate(setupCommand)
// or
const response2: ValidateResponse = await commandService.validate(
  observeCommand
)

//#validate-call
