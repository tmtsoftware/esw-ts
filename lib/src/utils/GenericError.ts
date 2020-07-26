export class GenericError extends Error {
  constructor(readonly status: number, readonly message: string, readonly reason: any) {
    super(message)
  }
}
