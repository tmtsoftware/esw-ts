import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/Decoder'
import { Prefix } from '../models/params/Prefix'
import type { Decoder } from '../utils/Decoder'

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
