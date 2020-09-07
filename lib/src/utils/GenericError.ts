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
    return new GenericError(errorType, responseBody, status, statusText)
  }
}
