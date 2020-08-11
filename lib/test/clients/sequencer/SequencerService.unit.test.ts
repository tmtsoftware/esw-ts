import { ComponentId, Prefix, SequenceCommand, Setup, Wait } from '../../../src/models'
import * as Req from '../../../src/clients/sequencer/models/PostCommand'
import { SequencerPostRequest } from '../../../src/clients/sequencer/models/PostCommand'
import { GatewaySequencerCommand } from '../../../src/clients/gateway/models/Gateway'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import { SequencerServiceImpl } from '../../../src/clients/sequencer/SequencerService'

const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')

const eswTestPrefix = Prefix.fromString('ESW.test')
const setupCommand = new Setup(eswTestPrefix, 'command-1', [])
const waitCommand = new Wait(eswTestPrefix, 'command-1', [])
const commands: SequenceCommand[] = [setupCommand, waitCommand]
const sequence: SequenceCommand[] = [setupCommand]

const mockRequestRes: jest.Mock = jest.fn()
const sequencer = new SequencerServiceImpl(componentId, mockHttpTransport(mockRequestRes), () =>
  mockWsTransport()
)

const getGatewaySequencerCommand = (command: SequencerPostRequest) => {
  return new GatewaySequencerCommand(componentId, command)
}

const verifyPayload = (gatewayCommand: GatewaySequencerCommand) => {
  expect(mockRequestRes).toBeCalledWith(gatewayCommand, expect.anything())
}

describe('SequencerService', () => {
  test('should load a sequence in given sequencer | ESW-307', async () => {
    await sequencer.loadSequence(sequence)
    verifyPayload(getGatewaySequencerCommand(new Req.LoadSequence(sequence)))
  })

  test('should start the sequence in given sequencer | ESW-307', async () => {
    await sequencer.startSequence()
    verifyPayload(getGatewaySequencerCommand(new Req.StartSequence()))
  })

  test('should add given commands in the sequence of given sequencer | ESW-307', async () => {
    await sequencer.add(commands)
    verifyPayload(getGatewaySequencerCommand(new Req.Add(commands)))
  })

  test('should prepend given commands in the sequence of given sequencer | ESW-307', async () => {
    await sequencer.prepend(commands)
    verifyPayload(getGatewaySequencerCommand(new Req.Prepend(commands)))
  })

  test('should replace given id command with given commands | ESW-307', async () => {
    await sequencer.replace('id-123', commands)
    verifyPayload(getGatewaySequencerCommand(new Req.Replace('id-123', commands)))
  })

  test('should insert the given commands after given command of given id | ESW-307', async () => {
    await sequencer.insertAfter('id-123', commands)
    verifyPayload(getGatewaySequencerCommand(new Req.InsertAfter('id-123', commands)))
  })

  test('should delete the given command from sequence | ESW-307', async () => {
    await sequencer.delete('id-123')
    verifyPayload(getGatewaySequencerCommand(new Req.Delete('id-123')))
  })

  test('should add a breakPoint on the given command from sequence | ESW-307', async () => {
    await sequencer.addBreakpoint('id-123')
    verifyPayload(getGatewaySequencerCommand(new Req.AddBreakpoint('id-123')))
  })

  test('should remove the breakPoint on the given command from sequence | ESW-307', async () => {
    await sequencer.removeBreakpoint('id-123')
    verifyPayload(getGatewaySequencerCommand(new Req.RemoveBreakpoint('id-123')))
  })

  test('should reset the sequence in given sequencer | ESW-307', async () => {
    await sequencer.reset()
    verifyPayload(getGatewaySequencerCommand(new Req.Reset()))
  })

  test('should resume the sequence in given sequencer | ESW-307', async () => {
    await sequencer.resume()
    verifyPayload(getGatewaySequencerCommand(new Req.Resume()))
  })

  test('should pause the sequence in given sequencer | ESW-307', async () => {
    await sequencer.pause()
    verifyPayload(getGatewaySequencerCommand(new Req.Pause()))
  })

  test('should get a step list from sequencer | ESW-307', async () => {
    await sequencer.getSequence()
    verifyPayload(getGatewaySequencerCommand(new Req.GetSequence()))
  })

  test('should return whether a sequencer is available | ESW-307', async () => {
    await sequencer.isAvailable()
    verifyPayload(getGatewaySequencerCommand(new Req.IsAvailable()))
  })

  test('should return whether a sequencer is online | ESW-307', async () => {
    await sequencer.isOnline()
    verifyPayload(getGatewaySequencerCommand(new Req.IsOnline()))
  })

  test('should get a go online response from sequencer on GoOnline | ESW-307', async () => {
    await sequencer.goOnline()
    verifyPayload(getGatewaySequencerCommand(new Req.GoOnline()))
  })

  test('should get a go offline response from sequencer on GoOffline | ESW-307', async () => {
    await sequencer.goOffline()
    verifyPayload(getGatewaySequencerCommand(new Req.GoOffline()))
  })

  test('should abort a sequence from sequencer | ESW-307', async () => {
    await sequencer.abortSequence()
    verifyPayload(getGatewaySequencerCommand(new Req.AbortSequence()))
  })

  test('should stop a sequence from sequencer | ESW-307', async () => {
    await sequencer.stop()
    verifyPayload(getGatewaySequencerCommand(new Req.Stop()))
  })

  test('should send diagnostic mode to sequencer | ESW-307', async () => {
    const date = new Date('2020-10-08')
    const hint = 'hint for diagnostic mode'

    await sequencer.diagnosticMode(date, hint)
    verifyPayload(getGatewaySequencerCommand(new Req.DiagnosticMode(date, hint)))
  })

  test('should send operations mode to sequencer | ESW-307', async () => {
    await sequencer.operationsMode()
    verifyPayload(getGatewaySequencerCommand(new Req.OperationsMode()))
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
