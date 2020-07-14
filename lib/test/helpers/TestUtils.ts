import { Either, getOrElse } from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

export const get = <A>(e: Either<D.DecodeError, A>): A =>
  getOrElse<D.DecodeError, A>((err) => {
    const msg = D.draw(err)
    throw Error('Right value not present, Error: ' + msg)
  })(e)
