import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/es6/Decoder'
import { Prefix } from '../models'
import type { Decoder } from './Decoder'

const parsePrefix = (prefixStr: string): E.Either<Error, Prefix> =>
  E.tryCatch(
    () => Prefix.fromString(prefixStr),
    (e) => (e instanceof Error ? e : new Error('unknown error'))
  )

export const PrefixD: Decoder<Prefix> = pipe(
  D.string,
  D.parse((str) => {
    const p = parsePrefix(str)
    return E.isRight(p) ? D.success(p.right) : D.failure(str, p.left.message)
  })
)
