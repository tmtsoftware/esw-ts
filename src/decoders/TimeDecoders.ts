import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { TAITime, UTCTime } from '../models/TMTTime'
import type { Decoder } from './Decoder'

const isInvalid = (date: Date) => date.toString() === 'Invalid Date'

export const UTCTimeD: Decoder<UTCTime> = pipe(
  D.string,
  D.parse((str: string) => {
    const date = new Date(str)
    return isInvalid(date) ? D.failure(str, 'Invalid Date') : D.success(new UTCTime(date))
  })
)

export const TAITimeD: Decoder<TAITime> = pipe(
  D.string,
  D.parse((str: string) => {
    const date = new Date(str)
    return date.toString() === 'Invalid Date' ? D.failure(str, 'Invalid Date') : D.success(new TAITime(date))
  })
)
