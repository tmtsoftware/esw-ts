import type {
  ComponentId,
  ControlCommand,
  CurrentState,
  Location,
  OnewayResponse,
  ServiceError,
  SubmitResponse,
  Subscription,
  ValidateResponse,
  AuthData
} from '../..'

import { GATEWAY_CONNECTION } from '../../config/Connections'
import { HttpTransport } from '../../utils/HttpTransport'
import { extractHostPort, getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Ws } from '../../utils/Ws'
import { resolve } from '../location/LocationUtils'
import { CommandServiceImpl } from './CommandServiceImpl'

/**
 *  A Command Service API of a CSW component. This model provides method based APIs for command interactions with a component.
 *  @interface
 *  @category Service
 */
export interface CommandService {
  /**
   * Send a validate command to a component which returns a promise of ValidateResponse.
   *
   * @param command           Command to be validated.
   * @return                  ValidateResponse as Promise
   */
  validate(command: ControlCommand): Promise<ValidateResponse>

  /**
   * Submit a command to a component which returns a promise of SubmitResponse.
   *
   * @param command           Command to be submitted.
   * @return                  SubmitResponse as Promise
   */
  submit(command: ControlCommand): Promise<SubmitResponse>

  /**
   * Submit a oneway command to a component which returns a promise of OnewayResponse.
   * This api is used when completion is provided through CurrentState or status values and eventService.
   *
   * @param command           Command to be sent as oneway command.
   * @return                  OnewayResponse as Promise
   */
  oneway(command: ControlCommand): Promise<OnewayResponse>

  /**
   * This api is used to get the result of a long running command which was submitted and returns a promise of SubmitResponse.
   *
   * @param runId             The runId of the command for which response is required
   * @return                  SubmitResponse as Promise
   */
  query(runId: string): Promise<SubmitResponse>

  /**
   * This api is used to get the final result of a long running command which was submitted and returns a promise of SubmitResponse.
   *
   * @param runId             The runId of the command for which response is required
   * @param timeoutInSeconds  time to wait for a final response
   * @return                  SubmitResponse as Promise
   */
  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>

  /**
   * Subscribe to the current state of a component corresponding to the AkkaLocation of the component
   *
   * @param stateNames        Subscribe to the set of currentStates. If no states are provided, all the current states will be received.
   * @param onStateChange     a callback which gets called on change of any of the subscribed currentState
   * @param onError           a optional error callback which gets called on receiving error.
   *                          it can be Parsing error or a Runtime error [for ex. Gateway exception]
   * @return                  Subscription which can be used to cancel to the subscription in future.
   */
  subscribeCurrentState(
    stateNames: Set<string>
  ): (
    onStateChange: (state: CurrentState) => void,
    onError?: (error: ServiceError) => void
  ) => Subscription

  /**
   * Submit a single command and wait for the result of the submitted command
   *
   * @param command           Command to be submitted
   * @param timeoutInSeconds  time to wait for a final response
   * @return                  SubmitResponse as Promise
   */
  submitAndWait(command: ControlCommand, timeoutInSeconds: number): Promise<SubmitResponse>

  /**
   * Submit multiple commands and wait for the result of the all submitted commands
   *
   * @param commands          a list of commands to be submitted
   * @param timeoutInSeconds  time to wait for a final response
   * @return                  SubmitResponse's List as Promise
   */
  submitAllAndWait(commands: ControlCommand[], timeoutInSeconds: number): Promise<SubmitResponse[]>
}

/**
 * Instantiate command service to enable interaction with the component.
 *
 * @param componentId         Component id for which command service is to be instantiated.
 * @param tokenFactory        a function that returns a valid token which has correct access roles and permissions for the specified componentId.
 * @return                    CommandService as Promise
 * @constructor
 */
export const CommandService = async (
  componentId: ComponentId,
  authData?: AuthData
): Promise<CommandService> => {
  const location = await resolve(GATEWAY_CONNECTION)
  return createCommandService(componentId, location, authData)
}

export const createCommandService = (
  componentId: ComponentId,
  location: Location,
  authData?: AuthData
): CommandService => {
  const { host, port } = extractHostPort(location.uri)
  const url = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })

  return new CommandServiceImpl(
    componentId,
    new HttpTransport(url, authData),
    () => new Ws(webSocketEndpoint, authData?.username)
  )
}
