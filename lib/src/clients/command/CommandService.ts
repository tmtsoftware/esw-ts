import type { TokenFactory } from '../../'
import { gatewayConnection, resolveConnection } from '../../config/Connections'
import type * as M from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Subscription, Ws } from '../../utils/Ws'
import { CommandServiceImpl } from './CommandServiceImpl'

/**
 *  A Command Service API of a csw component. This model provides method based APIs for command interactions with a component.
 *  @interface
 */
export interface CommandService {
  /**
   * Send a validate command to a component which returns a promise of ValidateResponse.
   * @param{ControlCommand} command can be of type either Setup or Observe command.
   * @return{Promise<ValidateResponse>} ValidateResponse which will be one of Accepted, Invalid or Locked.
   */
  validate(command: M.ControlCommand): Promise<M.ValidateResponse>
  /**
   * Submit a command to a component which returns a promise of SubmitResponse.
   * @param{ControlCommand} command can be of type either Setup or Observe command.
   * @return{Promise<SubmitResponse>} a Promise of SubmitResponse which will be one of Started, Completed, Error, Invalid, Locked or Cancelled
   */
  submit(command: M.ControlCommand): Promise<M.SubmitResponse>
  /**
   * Submit a oneway command to a component which returns a promise of OnewayResponse.
   * This api is used when completion is provided through CurrentState or status values and eventService.
   * @param{ControlCommand} command can be of type either Setup or Observe command.
   * @return{Promise<OnewayResponse>} a Promise of OnewayResponse which will be one of Accepted, Invalid or Locked.
   */
  oneway(command: M.ControlCommand): Promise<M.OnewayResponse>
  /**
   * This api is used to get the result of a long running command which was submitted and returns a promise of SubmitResponse.
   * @param{string} runId The runId of the command for which response is required
   * @return{Promise<SubmitResponse>} a Promise of SubmitResponse which will be one of Started, Completed, Error, Invalid, Locked or Cancelled
   */
  query(runId: string): Promise<M.SubmitResponse>
  /**
   * This api is used to get the final result of a long running command which was submitted and returns a promise of SubmitResponse.
   * @param{string} runId The runId of the command for which response is required
   * @param{number} timeoutInSeconds time to wait for a final response
   * @return{Promise<SubmitResponse>} a Promise of SubmitResponse which will be one of Started, Completed, Error, Invalid, Locked or Cancelled
   */
  queryFinal(runId: string, timeoutInSeconds: number): Promise<M.SubmitResponse>
  /**
   * Subscribe to the current state of a component corresponding to the AkkaLocation of the component
   * @param {Set<string>} stateNames Subscribe to the set of currentStates. If no states are provided, all the current states will be received.
   * @param {@callback} onStateChange - a callback which gets called on change of any of the subscribed currentState
   * @return{Subscription} which has a handle to cancel to the subscription in future.
   */
  subscribeCurrentState(
    stateNames: Set<string>
  ): (onStateChange: (state: M.CurrentState) => void) => Subscription
  /**
   * Submit a single command and wait for the result of the submitted command
   * @param{ControlCommand} command
   * @param{number} timeoutInSeconds time to wait for a final response
   * @return{Promise<SubmitResponse>} which will be one of Started, Completed, Error, Invalid, Locked or Cancelled
   */
  submitAndWait(command: M.ControlCommand, timeoutInSeconds: number): Promise<M.SubmitResponse>
  /**
   * Submit multiple commands and wait for the result of the all submitted commands
   * @param{ControlCommand[]} commands a list of commands to be submitted
   * @param{number} timeoutInSeconds time to wait for a final response
   * @return Promise of List of submitResponse where each of which will be one of Started, Completed, Error, Invalid, Locked or Cancelled
   */
  submitAllAndWait(
    commands: M.ControlCommand[],
    timeoutInSeconds: number
  ): Promise<M.SubmitResponse[]>
}

/**
 * Instantiate command service to enable interaction with the component.
 * @param componentId Component id for which command service is to be instantiated.
 * @param tokenFactory a function that returns a valid token which has correct access roles and permissions for the specified componentId.
 * @return {Promise<CommandService>} Promise of CommandService
 * @constructor
 */
export const CommandService = async (
  componentId: M.ComponentId,
  tokenFactory: TokenFactory = () => undefined
): Promise<CommandService> => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })
  return new CommandServiceImpl(
    componentId,
    new HttpTransport(postEndpoint, tokenFactory),
    () => new Ws(webSocketEndpoint)
  )
}
