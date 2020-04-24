import {
  CommandServiceHttpMessage,
  Observe,
  Oneway,
  Setup,
  Submit,
  Validate
} from 'clients/command/models/PostCommand'
import * as Commands from '../../../jsons/commandModels.json'

const setup = Setup('CSW.ncc.trombone', 'move', [], ['obs001'])
const observe = Observe('CSW.ncc.trombone', 'move', [], ['obs001'])

test('Submit command', () => {
  const observeSubmit: CommandServiceHttpMessage = Submit(observe)

  expect(Commands.Submit).toEqual(observeSubmit)
})

test('Oneway command', () => {
  const setupOneway: CommandServiceHttpMessage = Oneway(setup)

  expect(Commands.Oneway).toEqual(setupOneway)
})

test('Validate command', () => {
  const observeValidate: CommandServiceHttpMessage = Validate(observe)

  expect(Commands.Validate).toEqual(observeValidate)
})
