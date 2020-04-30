import {
  CommandServiceHttpMessage,
  Oneway,
  Query,
  Submit,
  Validate
} from 'clients/command/models/PostCommand'
import {
  CommandServiceWsMessage,
  QueryFinal,
  SubscribeCurrentState
} from 'clients/command/models/WsCommand'
import { GatewayComponentCommand } from 'clients/gateway/models/Gateway'
import * as Commands from 'jsons/commandModels.json'
import { ComponentId } from 'models/ComponentId'
import { Observe, Setup } from 'models/params/Command'
import { Prefix } from 'models/params/Prefix'

const setupCommand = new Setup('CSW.ncc.trombone', 'move', [], ['obs001'])
const observeCommand = new Observe('CSW.ncc.trombone', 'move', [], ['obs001'])

test('Submit command', () => {
  const observeSubmit: CommandServiceHttpMessage = new Submit(observeCommand)

  expect(observeSubmit).toEqual(Commands.Submit)
})

test('Oneway command', () => {
  const setupOneway: CommandServiceHttpMessage = new Oneway(setupCommand)

  expect(setupOneway).toEqual(Commands.Oneway)
})

test('Validate command', () => {
  const observeValidate: CommandServiceHttpMessage = new Validate(observeCommand)

  expect(observeValidate).toEqual(Commands.Validate)
})

test('Query command', () => {
  const queryCommand: CommandServiceHttpMessage = new Query('33b4515c-b226-491b-9626-898244490151')

  expect(queryCommand).toEqual(Commands.Query)
})

test('QueryFinal command', () => {
  const queryFinalCommand: CommandServiceWsMessage = new QueryFinal(
    '382aec51-928d-4a8d-8f16-8880c3f35d31',
    10000
  )

  expect(queryFinalCommand).toEqual(Commands.QueryFinal)
})

test('SubscribeCurrentState command', () => {
  const subscribeCurrentState: CommandServiceWsMessage = new SubscribeCurrentState(
    new Set(['temp', 'position'])
  )

  expect(subscribeCurrentState).toEqual(Commands.SubscribeCurrentState)
})

test('GatewayCommand', () => {
  const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')
  const gatewayCommand: GatewayComponentCommand = GatewayComponentCommand(
    compId,
    new Submit(observeCommand)
  )

  expect(JSON.parse(JSON.stringify(gatewayCommand))).toEqual(Commands.GatewayCommand)
})
