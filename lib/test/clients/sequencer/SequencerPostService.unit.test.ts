import {
  ComponentId,
  Prefix,
  SequenceCommand,
  Setup,
  SubmitResponse,
  Wait
} from '../../../src/models'
import * as Req from '../../../src/clients/sequencer/models/PostCommand'
import { SequencerPostRequest } from '../../../src/clients/sequencer/models/PostCommand'
import { GatewaySequencerCommand } from '../../../src/clients/gateway/models/Gateway'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import * as Res from '../../../src/clients/sequencer/models/SequencerRes'
import * as D from 'io-ts/lib/Decoder'
import { OptionOfStepList } from '../../../src/clients/sequencer/models/StepList'
import { SequencerServiceImpl } from '../../../src/clients/sequencer/SequencerServiceImpl'
import {
  QueryFinal,
  SequencerWebsocketRequest
} from '../../../src/clients/sequencer/models/WsCommand'

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
      Res.OkOrUnhandledResponse
    )
  })

  test('should start the sequence in given sequencer | ESW-307', async () => {
    await sequencer.startSequence()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.StartSequence()),
      SubmitResponse
    )
  })

  test('should add given commands in the sequence of given sequencer | ESW-307', async () => {
    await sequencer.add(commands)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Add(commands)),
      Res.OkOrUnhandledResponse
    )
  })

  test('should prepend given commands in the sequence of given sequencer | ESW-307', async () => {
    await sequencer.prepend(commands)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Prepend(commands)),
      Res.OkOrUnhandledResponse
    )
  })

  test('should replace given id command with given commands | ESW-307', async () => {
    await sequencer.replace('id-123', commands)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Replace('id-123', commands)),
      Res.GenericResponse
    )
  })

  test('should insert the given commands after given command of given id | ESW-307', async () => {
    await sequencer.insertAfter('id-123', commands)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.InsertAfter('id-123', commands)),
      Res.GenericResponse
    )
  })

  test('should delete the given command from sequence | ESW-307', async () => {
    await sequencer.delete('id-123')
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Delete('id-123')),
      Res.GenericResponse
    )
  })

  test('should add a breakPoint on the given command from sequence | ESW-307', async () => {
    await sequencer.addBreakpoint('id-123')
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.AddBreakpoint('id-123')),
      Res.GenericResponse
    )
  })

  test('should remove the breakPoint on the given command from sequence | ESW-307', async () => {
    await sequencer.removeBreakpoint('id-123')
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.RemoveBreakpoint('id-123')),
      Res.RemoveBreakpointResponse
    )
  })

  test('should reset the sequence in given sequencer | ESW-307', async () => {
    await sequencer.reset()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Reset()),
      Res.OkOrUnhandledResponse
    )
  })

  test('should resume the sequence in given sequencer | ESW-307', async () => {
    await sequencer.resume()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Resume()),
      Res.OkOrUnhandledResponse
    )
  })

  test('should pause the sequence in given sequencer | ESW-307', async () => {
    await sequencer.pause()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Pause()),
      Res.PauseResponse
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
      Res.GoOnlineResponse
    )
  })

  test('should get a go offline response from sequencer on GoOffline | ESW-307', async () => {
    await sequencer.goOffline()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.GoOffline()),
      Res.GoOfflineResponse
    )
  })

  test('should abort a sequence from sequencer | ESW-307', async () => {
    await sequencer.abortSequence()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.AbortSequence()),
      Res.OkOrUnhandledResponse
    )
  })

  test('should stop a sequence from sequencer | ESW-307', async () => {
    await sequencer.stop()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Stop()),
      Res.OkOrUnhandledResponse
    )
  })

  test('should send diagnostic mode to sequencer | ESW-307', async () => {
    const date = new Date('2020-10-08')
    const hint = 'hint for diagnostic mode'

    await sequencer.diagnosticMode(date, hint)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.DiagnosticMode(date, hint)),
      Res.DiagnosticModeResponse
    )
  })

  test('should send operations mode to sequencer | ESW-307', async () => {
    await sequencer.operationsMode()
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.OperationsMode()),
      Res.OperationsModeResponse
    )
  })

  test('should submit sequence to sequencer | ESW-307 , ESW-344', async () => {
    await sequencer.submit(sequence)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Submit(sequence)),
      SubmitResponse
    )
  })

  test('should get started response on submitAndWait when sequencer is started | ESW-307 , ESW-344', async () => {
    mockRequestRes.mockResolvedValueOnce({ _type: 'Started', runId: '123' })
    await sequencer.submitAndWait(sequence)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Submit(sequence)),
      SubmitResponse
    )
    expect(mockSingleResponse).toBeCalledWith(
      getGatewaySequencerCommand(new QueryFinal('123', 5)),
      SubmitResponse
    )
  })

  test('should not get started response on submitAndWait when sequencer not started | ESW-307 , ESW-344', async () => {
    mockRequestRes.mockResolvedValueOnce({ _type: 'Completed', runId: '123', result: [] })
    await sequencer.submitAndWait(sequence)
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Submit(sequence)),
      SubmitResponse
    )
    expect(mockSingleResponse).toBeCalledTimes(0)
  })

  test('should query to sequencer | ESW-307 , ESW-344', async () => {
    await sequencer.query('123')
    expect(mockRequestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Query('123')),
      SubmitResponse
    )
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
