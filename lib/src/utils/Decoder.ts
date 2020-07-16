import * as D from 'io-ts/lib/Decoder'
import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as A from 'fp-ts/lib/ReadonlyArray'

export type Decoder<T> = D.Decoder<unknown, T>

export const char = pipe(
  D.string,
  D.refine((s): s is string => s.length == 1, 'single char')
)

export const CaseInsensitiveLiteral = <L extends readonly [string, ...Array<string>]>(
  ...values: L
): Decoder<L[number]> => {
  const message = values.map((value) => JSON.stringify(value)).join(' | ')
  return {
    decode: flow(
      D.string.decode,
      E.chain((s) =>
        pipe(
          values,
          A.findIndex((value) => value.toLowerCase() === s.toLowerCase()),
          O.fold(
            () => D.failure(s, message),
            (i) => D.success(values[i])
          )
        )
      )
    )
  }
}
