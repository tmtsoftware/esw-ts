import { Either, getOrElse } from 'fp-ts/lib/Either'
import { DecodeError } from 'io-ts/lib/Decoder'

export const get = <A>(e: Either<DecodeError, A>): A =>
  getOrElse<DecodeError, A>(() => {
    console.log(e)
    throw Error('Right value not present, Error: ' + e)
  })(e)
