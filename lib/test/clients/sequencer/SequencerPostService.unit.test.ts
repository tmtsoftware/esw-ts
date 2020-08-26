import * as D from 'io-ts/lib/Decoder'
import { GatewaySequencerCommand } from '../../../src/clients/gateway/models/Gateway'
import * as Req from '../../../src/clients/sequencer/models/PostCommand'
import { SequencerPostRequest } from '../../../src/clients/sequencer/models/PostCommand'
import * as Res from '../../../src/clients/sequencer/models/SequencerRes'
import { OptionOfStepList } from '../../../src/clients/sequencer/models/StepList'
import {
  QueryFinal,
  SequencerWebsocketRequest
} from '../../../src/clients/sequencer/models/WsCommand'
import { SequencerServiceImpl } from '../../../src/clients/sequencer/SequencerServiceImpl'
import {
  ComponentId,
  Prefix,
  SequenceCommand,
  Setup,
  SubmitResponseD,
  Wait
} from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'

const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')

const eswTestPrefix = Prefix.fromString('ESW.test')
const setupCommand = new Setup(eswTestPrefix, 'command-1', [])
const waitCommand = new Wait(eswTestPrefix, 'command-1', [])
const commands: SequenceCommand[] = [setupCommand, waitCommand]
const sequence: SequenceCommand[] = [setupCommand]

const mockRequestRes: jest.Mock = jest.fn()
const mockSingleResponse: jest.Mock = jest.fn()
const sequencer = new SequencerServiceImpl(componentId, mockHttpTransport(mockRequestRes), () =>
  mockWsTransport(jest.fn(), mockSingleResponse)
)

const getGatewaySequencerCommand = (command: SequencerPostRequest | SequencerWebsocketRequest) => {
  return new GatewaySequencerCommand(componentId, command)
}

describe('SequencerService', () => {
  test('should load a sequence in given sequencer | ESW-307', async () => {
    await sequencer.loadSequence(sequence)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.LoadSequence(sequence)),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should start the sequence in given sequencer | ESW-307', async () => {
    await sequencer.startSequence()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.StartSequence()),
      SubmitResponseD
    )
  })

  test('should add given commands in the sequence of given sequencer | ESW-307', async () => {
    await sequencer.add(commands)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Add(commands)),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should prepend given commands in the sequence of given sequencer | ESW-307', async () => {
    await sequencer.prepend(commands)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Prepend(commands)),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should replace given id command with given commands | ESW-307', async () => {
    await sequencer.replace('id-123', commands)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Replace('id-123', commands)),
      Res.GenericResponseD
    )
  })

  test('should insert the given commands after given command of given id | ESW-307', async () => {
    await sequencer.insertAfter('id-123', commands)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.InsertAfter('id-123', commands)),
      Res.GenericResponseD
    )
  })

  test('should delete the given command from sequence | ESW-307', async () => {
    await sequencer.delete('id-123')
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Delete('id-123')),
      Res.GenericResponseD
    )
  })

  test('should add a breakPoint on the given command from sequence | ESW-307', async () => {
    await sequencer.addBreakpoint('id-123')
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.AddBreakpoint('id-123')),
      Res.GenericResponseD
    )
  })

  test('should remove the breakPoint on the given command from sequence | ESW-307', async () => {
    await sequencer.removeBreakpoint('id-123')
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.RemoveBreakpoint('id-123')),
      Res.RemoveBreakpointResponseD
    )
  })

  test('should reset the sequence in given sequencer | ESW-307', async () => {
    await sequencer.reset()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Reset()),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should resume the sequence in given sequencer | ESW-307', async () => {
    await sequencer.resume()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Resume()),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should pause the sequence in given sequencer | ESW-307', async () => {
    await sequencer.pause()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Pause()),
      Res.PauseResponseD
    )
  })

  test('should get a step list from sequencer | ESW-307', async () => {
    mockRequestRes.mockResolvedValueOnce([])
    await sequencer.getSequence()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.GetSequence()),
      OptionOfStepList
    )
  })

  test('should return whether a sequencer is available | ESW-307', async () => {
    await sequencer.isAvailable()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.IsAvailable()),
      D.boolean
    )
  })

  test('should return whether a sequencer is online | ESW-307', async () => {
    await sequencer.isOnline()
    expect(mockRequestRes).toBeCalledWith(getGatewaySequencerCommand(new Req.IsOnline()), D.boolean)
  })

  test('should get a go online response from sequencer on GoOnline | ESW-307', async () => {
    await sequencer.goOnline()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.GoOnline()),
      Res.GoOnlineResponseD
    )
  })

  test('should get a go offline response from sequencer on GoOffline | ESW-307', async () => {
    await sequencer.goOffline()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.GoOffline()),
      Res.GoOfflineResponseD
    )
  })

  test('should abort a sequence from sequencer | ESW-307', async () => {
    await sequencer.abortSequence()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.AbortSequence()),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should stop a sequence from sequencer | ESW-307', async () => {
    await sequencer.stop()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Stop()),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should send diagnostic mode to sequencer | ESW-307', async () => {
    const date = new Date('2020-10-08')
    const hint = 'hint for diagnostic mode'

    await sequencer.diagnosticMode(date, hint)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.DiagnosticMode(date, hint)),
      Res.DiagnosticModeResponseD
    )
  })

  test('should send operations mode to sequencer | ESW-307', async () => {
    await sequencer.operationsMode()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.OperationsMode()),
      Res.OperationsModeResponseD
    )
  })

  test('should submit sequence to sequencer | ESW-307 , ESW-344', async () => {
    await sequencer.submit(sequence)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Submit(sequence)),
      SubmitResponseD
    )
  })

  test('should get started response on submitAndWait when sequencer is started | ESW-307 , ESW-344', async () => {
    mockRequestRes.mockResolvedValueOnce({ _type: 'Started', runId: '123' })
    await sequencer.submitAndWait(sequence)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Submit(sequence)),
      SubmitResponseD
    )
    expect(mockSingleResponse).toBeCalledWith(
      getGatewaySequencerCommand(new QueryFinal('123', 5)),
      SubmitResponseD
    )
  })

  test('should not get started response on submitAndWait when sequencer not started | ESW-307 , ESW-344', async () => {
    mockRequestRes.mockResolvedValueOnce({ _type: 'Completed', runId: '123', result: [] })
    await sequencer.submitAndWait(sequence)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Submit(sequence)),
      SubmitResponseD
    )
    expect(mockSingleResponse).toBeCalledTimes(0)
  })

  test('should query to sequencer | ESW-307 , ESW-344', async () => {
    await sequencer.query('123')
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Query('123')),
      SubmitResponseD
    )
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
