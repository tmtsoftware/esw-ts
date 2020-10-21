import type {
  DiagnosticModeResponse,
  GenericResponse,
  GoOfflineResponse,
  GoOnlineResponse,
  OkOrUnhandledResponse,
  OperationsModeResponse,
  Option,
  PauseResponse,
  RemoveBreakpointResponse,
  TokenFactory
} from '../..'
import { gatewayConnection, resolveConnection } from '../../config/Connections'
import type { ComponentId, SequenceCommand, SubmitResponse } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Ws } from '../../utils/Ws'
import type { StepList } from './models/StepList'
import { SequencerServiceImpl } from './SequencerServiceImpl'

/**
 * @category Service
 */
export interface SequencerService {
  /**
   * Loads the given sequence to the sequencer
   *
   * @param sequence a sequence to load in the sequencer
   * @returns OkOrUnhandledResponse as Promise
   */
  loadSequence(sequence: SequenceCommand[]): Promise<OkOrUnhandledResponse>

  /**
   * Runs the loaded sequence
   *
   * @returns SubmitResponse as Promise
   */
  startSequence(): Promise<SubmitResponse>

  /**
   * Adds the given list of sequence commands at the end of the sequence
   *
   * @param commands list of SequenceCommand to add in the sequence of sequencer
   * @returns OkOrUnhandledResponse as Promise
   */
  add(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse>

  /**
   * Prepends the given list of sequence commands in the sequence
   *
   * @param commands list of SequenceCommand to prepend in the sequence of sequencer
   * @returns OkOrUnhandledResponse as Promise
   */
  prepend(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse>

  /**
   * Replaces the command of the given id with the given list of sequence commands in the sequence
   *
   * @param id runId of command which is to be replaced
   * @param commands list of SequenceCommand to replace with
   * @returns GenericResponse as Promise
   */
  replace(id: string, commands: SequenceCommand[]): Promise<GenericResponse>

  /**
   * Inserts the given list of sequence commands after the command of given id in the sequence
   *
   * @param id runId of command after which the given list of commands is to be inserted
   * @param commands list of SequenceCommand to be inserted
   * @returns GenericResponse as Promise
   */
  insertAfter(id: string, commands: SequenceCommand[]): Promise<GenericResponse>

  /**
   * Deletes the command of the given id in the sequence
   *
   * @param id runId of the command which is to be deleted
   * @returns GenericResponse as Promise
   */
  delete(id: string): Promise<GenericResponse>

  /**
   * Adds a breakpoint at the command of the given id in the sequence
   *
   * @param id runId of the command where breakpoint is to be added
   * @returns GenericResponse as Promise
   */
  addBreakpoint(id: string): Promise<GenericResponse>

  /**
   * Removes a breakpoint from the command of the given id in the sequence
   *
   * @param id runId of command where breakpoint is
   * @returns GenericResponse as Promise
   */
  removeBreakpoint(id: string): Promise<RemoveBreakpointResponse>

  /**
   * Resets the sequence by discarding all the pending steps of the sequence
   *
   * @returns OkOrUnhandledResponse as Promise
   */
  reset(): Promise<OkOrUnhandledResponse>

  /**
   * Resumes the paused sequence
   *
   * @returns OkOrUnhandledResponse as Promise
   */
  resume(): Promise<OkOrUnhandledResponse>

  /**
   * Pauses the sequence
   *
   * @returns PauseResponse as Promise
   */
  pause(): Promise<PauseResponse>

  /**
   * Gets the sequence present in the sequencer
   *
   * @returns Option<StepList> as Promise
   */
  getSequence(): Promise<Option<StepList>>

  /**
   * Checks if sequencer is in Idle state
   *
   * @returns boolean as Promise
   */
  isAvailable(): Promise<boolean>

  /**
   * Checks if sequencer is in Online(any state except Offline) state
   *
   * @returns boolean as Promise
   */
  isOnline(): Promise<boolean>

  /**
   * sends command to the sequencer to go in Online state if it is in Offline state
   *
   * @returns GoOnlineResponse as Promise
   */
  goOnline(): Promise<GoOnlineResponse>

  /**
   * sends command to the sequencer to go in Offline state if it is in Online state
   *
   * @returns GoOfflineResponse as Promise
   */
  goOffline(): Promise<GoOfflineResponse>

  /**
   * Discards all the pending steps of the sequence and call the abort handler of the sequencer's script
   *
   * @returns OkOrUnhandledResponse as Promise
   */
  abortSequence(): Promise<OkOrUnhandledResponse>

  /**
   * Discards all the pending steps of the sequence and call the stop handler of the sequencer's script
   *
   * @returns OkOrUnhandledResponse as Promise
   */
  stop(): Promise<OkOrUnhandledResponse>

  /**
   * Sends command to the sequencer to call the diagnostic mode handler of the sequencer's script
   *
   * @param startTime time at which the diagnostic mode will take effect
   * @param hint supported diagnostic data mode
   * @returns DiagnosticModeResponse as Promise
   */
  diagnosticMode(startTime: Date, hint: string): Promise<DiagnosticModeResponse>

  /**
   * Sends command to the sequencer to call the operations mode handler of the sequencer's script
   *
   * @returns OperationsModeResponse as Promise
   */
  operationsMode(): Promise<OperationsModeResponse>

  /**
   * Submit the given sequence to the sequencer
   * and returns the immediate SubmitResponse.
   *
   * @param sequence sequence to run on the sequencer
   * @return SubmitResponse as Promise
   */
  submit(sequence: SequenceCommand[]): Promise<SubmitResponse>

  /**
   * Submit the given sequence to the sequencer and waits until sequence execution completed
   * and returns the final SubmitResponse
   *
   * @param sequence sequence to run on the sequencer
   * @param timeoutInSeconds timeout
   * @return SubmitResponse as Promise
   */
  submitAndWait(sequence: SequenceCommand[], timeoutInSeconds: number): Promise<SubmitResponse>

  /**
   * Queries the response of sequence of the given runId
   * and returns the immediate SubmitResponse
   *
   * @param runId runId of the sequence
   * @return SubmitResponse as Promise
   */
  query(runId: string): Promise<SubmitResponse>

  // websocket api
  /**
   * Queries the response of the sequence of given id
   * and returns the final SubmitResponse
   * If sequence is not finished it waits till the given timeout
   *
   * @param runId runId of the sequence
   * @param timeoutInSeconds timeout
   * @return SubmitResponse as Promise
   */
  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>
}

/**
 * Instantiate SequencerService to enable interaction with the sequencer
 *
 * @param componentId component id for which sequencer service is to be instantiated.
 * @param tokenFactory a function that returns a valid token which has correct access roles and permissions for the specified componentId.
 * @return SequencerService as Promise
 * @constructor
 */
export const SequencerService = async (
  componentId: ComponentId,
  tokenFactory: TokenFactory
): Promise<SequencerService> => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })

  return new SequencerServiceImpl(
    componentId,
    new HttpTransport(postEndpoint, tokenFactory),
    () => new Ws(webSocketEndpoint)
  )
}
