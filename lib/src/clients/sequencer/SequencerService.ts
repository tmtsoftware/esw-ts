import type { TokenFactory, Option } from '../..'
import { gatewayConnection, resolveConnection } from '../../config/Connections'
import type { ComponentId, SequenceCommand, SubmitResponse } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'

import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Ws } from '../../utils/Ws'
import type * as Res from './models/SequencerRes'
import type { StepList } from './models/StepList'
import { SequencerServiceImpl } from './SequencerServiceImpl'

export interface SequencerService {
  /**
   * Loads the given sequence to the sequencer
   *
   * @param sequence - a sequence to load in the sequencer
   * @returns [OkOrUnhandledResponse] as a Promise value
   */
  loadSequence(sequence: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse>

  /**
   * Runs the loaded sequence of the sequencer
   *
   * @returns [SubmitResponse] as a Promise value
   */
  startSequence(): Promise<SubmitResponse>

  /**
   * Adds the given list of sequence commands at the end of the sequence of sequencer
   *
   * @param commands - list of SequenceCommand to add in the sequence of sequencer
   * @returns [OkOrUnhandledResponse] as a Promise value
   */
  add(commands: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse>

  /**
   * Prepends the given list of sequence commands in the sequence of sequencer
   *
   * @param commands - list of SequenceCommand to prepend in the sequence of sequencer
   * @returns [OkOrUnhandledResponse] as a Promise value
   */
  prepend(commands: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse>

  /**
   * Replaces the command of the given id with the given list of sequence commands in the sequence of sequencer
   *
   * @param id of command which is to be replaced
   * @param commands - list of SequenceCommand to replace with
   * @returns [GenericResponse] as a Promise value
   */
  replace(id: string, commands: SequenceCommand[]): Promise<Res.GenericResponse>

  /**
   * Inserts the given list of sequence commands after the command of the given id in the sequence of sequencer
   *
   * @param id - runId of command after which the given list of commands is to be inserted
   * @param commands - list of SequenceCommand to be inserted
   * @returns [GenericResponse] as a Promise value
   */
  insertAfter(id: string, commands: SequenceCommand[]): Promise<Res.GenericResponse>

  /**
   * Deletes the command of the given id in the sequence of sequencer
   *
   * @param id - runId of the command which is to be deleted
   * @returns [GenericResponse] as a Promise value
   */
  delete(id: string): Promise<Res.GenericResponse>

  /**
   * Adds a breakpoint at the command of the given id in the sequence of sequencer
   *
   * @param id - runId of the command where breakpoint is to be added
   * @returns [GenericResponse] as a Promise value
   */
  addBreakpoint(id: string): Promise<Res.GenericResponse>

  /**
   * Removes a breakpoint from the command of the given id in the sequence of sequencer
   *
   * @param id - runId of command where breakpoint is
   * @returns [GenericResponse] as a Promise value
   */
  removeBreakpoint(id: string): Promise<Res.RemoveBreakpointResponse>

  /**
   * Resets the sequence of sequencer by discarding all the pending steps of the sequence
   *
   * @returns [OkOrUnhandledResponse] as a Promise value
   */
  reset(): Promise<Res.OkOrUnhandledResponse>

  /**
   * Resumes the paused sequence of sequencer
   *
   * @returns [OkOrUnhandledResponse] as a Promise value
   */
  resume(): Promise<Res.OkOrUnhandledResponse>

  /**
   * Pauses the sequence
   *
   * @returns [PauseResponse] as a Promise value
   */
  pause(): Promise<Res.PauseResponse>

  /**
   * Gets the sequence presents in the sequencer
   *
   * @returns [Option<StepList>] as a Promise value
   */
  getSequence(): Promise<Option<StepList>>

  /**
   * Checks if sequencer is in Idle state
   *
   * @returns [boolean] as a Promise value
   */
  isAvailable(): Promise<boolean>

  /**
   * Checks if sequencer is in Online(any state except Offline) state
   *
   * @returns [boolean] as a Promise value
   */
  isOnline(): Promise<boolean>

  /**
   * sends command to the sequencer to go in Online state if it is in Offline
   *
   * @returns [GoOnlineResponse] as a Promise value
   */
  goOnline(): Promise<Res.GoOnlineResponse>

  /**
   * sends command to the sequencer to go in Offline state if it is in Online state
   *
   * @returns [GoOfflineResponse] as a Promise value
   */
  goOffline(): Promise<Res.GoOfflineResponse>

  /**
   * Discards all the pending steps of the sequence and call the abort handler of the sequencer's script
   *
   * @returns [OkOrUnhandledResponse] as a Promise value
   */
  abortSequence(): Promise<Res.OkOrUnhandledResponse>

  /**
   * Discards all the pending steps of the sequence and call the stop handler of the sequencer's script
   *
   * @returns [OkOrUnhandledResponse] as a Promise value
   */
  stop(): Promise<Res.OkOrUnhandledResponse>

  /**
   * Sends command to the sequencer to call the diagnostic mode handler of the sequencer's script
   *
   * @returns [DiagnosticModeResponse] as a Promise value
   */
  diagnosticMode(startTime: Date, hint: string): Promise<Res.DiagnosticModeResponse>

  /**
   * Sends command to the sequencer to call the operations mode handler of the sequencer's script
   *
   * @returns [OperationsModeResponse] as a Promise value
   */
  operationsMode(): Promise<Res.OperationsModeResponse>

  /**
   * Submit the given sequence to the sequencer
   * and returns the immediate SubmitResponse.
   *
   * @param sequence - sequence to run on the sequencer
   * @return [SubmitResponse] as a Promise value
   */
  submit(sequence: SequenceCommand[]): Promise<SubmitResponse>

  /**
   * Submit the given sequence to the sequencer and waits until sequence execution completed
   * and returns the final SubmitResponse
   *
   * @param sequence - sequence to run on the sequencer
   * @param timeoutInSeconds - timeout
   * @return [SubmitResponse] as a Promise value
   */
  submitAndWait(sequence: SequenceCommand[], timeoutInSeconds: number): Promise<SubmitResponse>

  /**
   * Queries the response of sequence of the given runId
   * and returns the immediate SubmitResponse
   *
   * @param runId of the sequence
   * @return [SubmitResponse] as a Promise value
   */
  query(runId: string): Promise<SubmitResponse>

  // websocket api
  /**
   * Queries the response of the sequence of given id
   * and returns the final SubmitResponse
   * If sequence is not finished it waits till the given timeout
   *
   * @param runId of the sequence
   * @param timeoutInSeconds - timeout
   * @return [SubmitResponse] as a Promise value
   */
  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>
}

/**
 * Instantiate SequencerService to enable interaction with the sequencer
 *
 * @param componentId - component id for which sequencer service is to be instantiated.
 * @param tokenFactory - a function that returns a valid token which has correct access roles and permissions for the specified componentId.
 * @return [SequencerService] as promise value
 * @constructor
 */
export const SequencerService: (
  componentId: ComponentId,
  tokenFactory: TokenFactory
) => Promise<SequencerService> = async (componentId: ComponentId, tokenFactory: TokenFactory) => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })

  return new SequencerServiceImpl(
    componentId,
    new HttpTransport(postEndpoint, tokenFactory),
    () => new Ws(webSocketEndpoint)
  )
}
