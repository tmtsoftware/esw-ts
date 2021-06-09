import * as E from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as A from 'fp-ts/lib/ReadonlyArray'
import * as D from 'io-ts/es6/Decoder'

export type Decoder<T> = D.Decoder<unknown, T>

export const char: Decoder<string> = pipe(
  D.string,
  D.refine((s): s is string => s.length == 1, 'single char')
)

export const ciLiteral = <L extends readonly [string, ...Array<string>]>(
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

export const object = <T>(bodyDecoders: Record<string, Decoder<T>>): Decoder<[string, T]> => {
  const keys = Object.keys(bodyDecoders)
  const keyDecoder = ciLiteral(keys[0], ...keys.slice(1))

  return pipe(
    D.UnknownRecord,
    D.parse((record) =>
      pipe(
        keyDecoder.decode(Object.keys(record)[0]),
        E.chain((keyTag) =>
          pipe(
            bodyDecoders[keyTag].decode(record[keyTag]),
            E.map((body) => [keyTag, body])
          )
        )
      )
    )
  )
}
