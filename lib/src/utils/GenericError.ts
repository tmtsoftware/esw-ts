export class GenericError extends Error {
  constructor(
    readonly errorType: string,
    readonly message: string,
    readonly status: number,
    readonly statusText: string
  ) {
    super(message)
  }

  static make(status: number, statusText: string, responseBody: any): GenericError {
    const errorType: string =
      status == 500
        ? responseBody._type
          ? responseBody._type
          : responseBody.error_name
        : 'TransportError'

    const message =
      status == 500 && responseBody.error_message ? responseBody.error_message : responseBody

    return new GenericError(errorType, message, status, statusText)
  }
}
