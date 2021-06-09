import { SERVER_ERROR } from '../utils/Ws'

/**
 * ServiceError is a model which captures all types of errors/exceptions received while making service calls
 * @class
 * @category Common
 */
export class ServiceError extends Error {
  constructor(
    readonly errorType: string,
    readonly message: string,
    readonly status: number,
    readonly statusText: string
  ) {
    super(message)
  }

  static make(status: number, statusText: string, responseBody: any): ServiceError {
    const errorType: string =
      status == 500 || status == SERVER_ERROR.code
        ? responseBody._type
          ? responseBody._type
          : responseBody.error_name
        : 'TransportError'

    const message =
      (status == 500 || status == SERVER_ERROR.code) && responseBody.error_message
        ? responseBody.error_message
        : responseBody.message //handle json parsing message's
        ? responseBody.message
        : responseBody

    return new ServiceError(errorType, message, status, statusText)
  }
}
