import * as D from 'io-ts/es6/Decoder'
import { mocked } from 'ts-jest/utils'
import {
  ComponentId,
  intKey,
  Key,
  Parameter,
  Prefix,
  Result,
  Sequence,
  SequenceCommand,
  Setup,
  stringKey,
  Wait
} from '../../../src'
import { GatewaySequencerCommand } from '../../../src/clients/gateway/models/Gateway'
import * as Req from '../../../src/clients/sequencer/models/PostCommand'
import {
  QueryFinal,
  SequencerWebsocketRequest
} from '../../../src/clients/sequencer/models/WsCommand'
import { SequencerServiceImpl } from '../../../src/clients/sequencer/SequencerServiceImpl'
import { SubmitResponseD } from '../../../src/decoders/CommandDecoders'
import * as Res from '../../../src/decoders/SequencerDecoders'
import { SequencerStateD } from '../../../src/decoders/SequencerDecoders'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const intParam: Parameter<Key> = intKey('number').set([1, 2, 3])
const stringParam: Parameter<Key> = stringKey('string').set(['abc', 'def'])
const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const eswTestPrefix = Prefix.fromString('ESW.test')
const setupCommand = new Setup(eswTestPrefix, 'command-1', [])
const waitCommand = new Wait(eswTestPrefix, 'command-1', [])
const commands: SequenceCommand[] = [setupCommand, waitCommand]
const sequence: Sequence = new Sequence([setupCommand])

const mockResponse = Math.random().toString()
const httpTransport: HttpTransport<GatewaySequencerCommand<Req.SequencerPostRequest>> =
  new HttpTransport('someUrl', { tokenFactory: jest.fn() })
const mockHttpTransport = mocked(httpTransport)

const ws: Ws<GatewaySequencerCommand<SequencerWebsocketRequest>> = new Ws('someUrl')
const mockWs = mocked(ws)
const sequencer = new SequencerServiceImpl(componentId, httpTransport, () => ws)

const getGatewaySequencerCommand = (
  command: Req.SequencerPostRequest
): GatewaySequencerCommand<Req.SequencerPostRequest> =>
  new GatewaySequencerCommand(componentId, command)

describe('SequencerService', () => {
  test('should load a sequence in given sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.loadSequence(sequence)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.LoadSequence(sequence)),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should start the sequence in given sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.startSequence()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.StartSequence()),
      SubmitResponseD
    )
  })

  test('should add given commands in the sequence of given sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.add(commands)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Add(commands)),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should prepend given commands in the sequence of given sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.prepend(commands)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Prepend(commands)),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should replace given id command with given commands | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.replace('id-123', commands)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Replace('id-123', commands)),
      Res.GenericResponseD
    )
  })

  test('should insert the given commands after given command of given id | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.insertAfter('id-123', commands)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.InsertAfter('id-123', commands)),
      Res.GenericResponseD
    )
  })

  test('should delete the given command from sequence | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.delete('id-123')

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Delete('id-123')),
      Res.GenericResponseD
    )
  })

  test('should add a breakPoint on the given command from sequence | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.addBreakpoint('id-123')

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.AddBreakpoint('id-123')),
      Res.GenericResponseD
    )
  })

  test('should remove the breakPoint on the given command from sequence | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.removeBreakpoint('id-123')

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.RemoveBreakpoint('id-123')),
      Res.RemoveBreakpointResponseD
    )
  })

  test('should reset the sequence in given sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.reset()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Reset()),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should resume the sequence in given sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.resume()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Resume()),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should pause the sequence in given sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.pause()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Pause()),
      Res.PauseResponseD
    )
  })

  test('should get undefined when a step list from sequencer is empty | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce([])

    const response = await sequencer.getSequence()

    expect(response).toEqual(undefined)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.GetSequence()),
      Res.OptionOfStepList
    )
  })

  test('should get step list from sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce([mockResponse])

    const response = await sequencer.getSequence()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.GetSequence()),
      Res.OptionOfStepList
    )
  })

  test('should return whether a sequencer is available | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.isAvailable()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.IsAvailable()),
      D.boolean
    )
  })

  test('should return whether a sequencer is online | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.isOnline()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.IsOnline()),
      D.boolean
    )
  })

  test('should get a go online response from sequencer on GoOnline | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.goOnline()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.GoOnline()),
      Res.GoOnlineResponseD
    )
  })

  test('should get a go offline response from sequencer on GoOffline | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.goOffline()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.GoOffline()),
      Res.GoOfflineResponseD
    )
  })

  test('should abort a sequence from sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.abortSequence()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.AbortSequence()),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should stop a sequence from sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.stop()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Stop()),
      Res.OkOrUnhandledResponseD
    )
  })

  test('should send diagnostic mode to sequencer | ESW-307', async () => {
    const date = new Date('2020-10-08')
    const hint = 'hint for diagnostic mode'
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.diagnosticMode(date, hint)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.DiagnosticMode(date, hint)),
      Res.DiagnosticModeResponseD
    )
  })

  test('should send operations mode to sequencer | ESW-307', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.operationsMode()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.OperationsMode()),
      Res.OperationsModeResponseD
    )
  })

  test('should submit sequence to sequencer | ESW-307 , ESW-344', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.submit(sequence)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Submit(sequence)),
      SubmitResponseD
    )
  })

  test('should get started response on submitAndWait when sequencer is started | ESW-307 , ESW-344', async () => {
    const mockSubmitResponse = { _type: 'Started', runId: '123' }
    const mockQueryFinalResponse = {
      _type: 'Completed',
      runId: '123',
      result: new Result().add(intParam)
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(mockSubmitResponse)
    mockWs.singleResponse.mockResolvedValueOnce(mockQueryFinalResponse)

    const response = await sequencer.submitAndWait(sequence, 5)

    expect(response).toEqual(mockQueryFinalResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Submit(sequence)),
      SubmitResponseD
    )
    verify(mockWs.singleResponse).toBeCalledWith(
      new GatewaySequencerCommand(componentId, new QueryFinal('123', 5)),
      SubmitResponseD
    )
  })

  test('should not get started response on submitAndWait when sequencer not started | ESW-307 , ESW-344', async () => {
    const mockResponse = {
      _type: 'Completed',
      runId: '123',
      result: new Result([intParam]).add(stringParam)
    }
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.submitAndWait(sequence, 5)

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Submit(sequence)),
      SubmitResponseD
    )
    expect(mockWs.singleResponse).toBeCalledTimes(0)
  })

  test('should query to sequencer | ESW-307 , ESW-344', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.query('123')

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.Query('123')),
      SubmitResponseD
    )
  })

  test('should return state of sequencer | ESW-483', async () => {
    const mockResponse = { _type: 'Idle' }
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockResponse)

    const response = await sequencer.getSequencerState()

    expect(response).toEqual(mockResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      getGatewaySequencerCommand(new Req.GetSequencerState()),
      SequencerStateD
    )
  })
})

afterEach(() => jest.clearAllMocks())
