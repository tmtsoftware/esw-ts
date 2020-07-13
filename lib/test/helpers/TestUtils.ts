import { Either, getOrElse } from 'fp-ts/lib/Either'
import Reporter from 'io-ts-reporters'
import { Errors } from 'io-ts'

export const get = <A>(e: Either<Errors, A>): A =>
  getOrElse<Errors, A>(() => {
    const err = Reporter.report(e).join(',')
    throw Error('Right value not present, Error: ' + err)
  })(e)
