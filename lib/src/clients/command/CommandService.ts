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
   * @param command can be of type either Setup or Observe command.
   * @return Promise of ValidateResponse
   */
  validate(command: M.ControlCommand): Promise<M.ValidateResponse>
  /**
   * Submit a command to a component which returns a promise of SubmitResponse.
   * @param command can be of type either Setup or Observe command.
   * @return Promise of SubmitResponse
   */
  submit(command: M.ControlCommand): Promise<M.SubmitResponse>
  /**
   * Submit a oneway command to a component which returns a promise of OnewayResponse.
   * This api is used when completion is provided through CurrentState or status values and eventService.
   * @param command can be of type either Setup or Observe command.
   * @return Promise of OnewayResponse
   */
  oneway(command: M.ControlCommand): Promise<M.OnewayResponse>
  /**
   * This api is used to get the result of a long running command which was submitted and returns a promise of SubmitResponse.
   * @param runId The runId of the command for which response is required
   * @return Promise of SubmitResponse
   */
  query(runId: string): Promise<M.SubmitResponse>
  /**
   * This api is used to get the final result of a long running command which was submitted and returns a promise of SubmitResponse.
   * @param runId The runId of the command for which response is required
   * @param timeoutInSeconds time to wait for a final response
   * @return Promise of SubmitResponse
   */
  queryFinal(runId: string, timeoutInSeconds: number): Promise<M.SubmitResponse>
  /**
   * Subscribe to the current state of a component corresponding to the AkkaLocation of the component
   * @param stateNames Subscribe to the set of currentStates. If no states are provided, all the current states will be received.
   * @param onStateChange - a callback which gets called on change of any of the subscribed currentState
   * @return Subscription which can be used to cancel to the subscription in future.
   */
  subscribeCurrentState(
    stateNames: Set<string>
  ): (onStateChange: (state: M.CurrentState) => void) => Subscription
  /**
   * Submit a single command and wait for the result of the submitted command
   * @param command
   * @param timeoutInSeconds time to wait for a final response
   * @return Promise of SubmitResponse
   */
  submitAndWait(command: M.ControlCommand, timeoutInSeconds: number): Promise<M.SubmitResponse>
  /**
   * Submit multiple commands and wait for the result of the all submitted commands
   * @param commands a list of commands to be submitted
   * @param timeoutInSeconds time to wait for a final response
   * @return Promise of List of submitResponse
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
 * @return Promise of CommandService
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
