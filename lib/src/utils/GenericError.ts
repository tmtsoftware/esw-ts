export class GenericError extends Error {
  constructor(
    readonly errorType: string,
    readonly message: string,
    readonly status: number,
    readonly statusText: string
  ) {
    super(message)
  }
}
