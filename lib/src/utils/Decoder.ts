import { pipe } from 'fp-ts/lib/pipeable'
import * as D from 'io-ts/lib/Decoder'

export type Decoder<T> = D.Decoder<unknown, T>

export const char = pipe(
  D.string,
  D.refine((s): s is string => s.length == 1, 'single char')
)
