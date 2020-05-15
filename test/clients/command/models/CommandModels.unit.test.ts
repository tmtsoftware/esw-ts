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
import * as TestData from 'jsons/CommandRequests.json'
import { ComponentId } from 'models/ComponentId'
import { Observe, Setup } from 'models/params/Command'
import { Prefix } from 'models/params/Prefix'

const setupCommand = new Setup('CSW.ncc.trombone', 'move', [], ['obs001'])
const observeCommand = new Observe('CSW.ncc.trombone', 'move', [], ['obs001'])

const observeSubmit: CommandServiceHttpMessage = new Submit(observeCommand)
const setupOneway: CommandServiceHttpMessage = new Oneway(setupCommand)
const observeValidate: CommandServiceHttpMessage = new Validate(observeCommand)
const queryCommand: CommandServiceHttpMessage = new Query('33b4515c-b226-491b-9626-898244490151')
const queryFinalCommand: CommandServiceWsMessage = new QueryFinal(
  '382aec51-928d-4a8d-8f16-8880c3f35d31',
  10000
)
const subscribeCurrentState: CommandServiceWsMessage = new SubscribeCurrentState(
  new Set(['temp', 'position'])
)
const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')
const gatewayCommand: GatewayComponentCommand = new GatewayComponentCommand(
  compId,
  new Submit(observeCommand)
)

describe('Commands ', () => {
  test.each([
    ['Submit', observeSubmit, TestData.Submit],
    ['Oneway', setupOneway, TestData.Oneway],
    ['Validate', observeValidate, TestData.Validate],
    ['Query', queryCommand, TestData.Query],
    ['Query Final', queryFinalCommand, TestData.QueryFinal],
    ['Query Final', subscribeCurrentState, TestData.SubscribeCurrentState],
    ['Gateway', gatewayCommand, TestData.GatewayCommand]
  ])('%s', (_, actual, expected) => expect(JSON.parse(JSON.stringify(actual))).toEqual(expected))
})
