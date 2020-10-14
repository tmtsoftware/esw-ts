import * as D from 'io-ts/lib/Decoder'
import type { Failed } from '../models/common'
import { ciLiteral, Decoder } from '../utils/Decoder'

export const FailedD: Decoder<Failed> = D.type({
  _type: ciLiteral('Failed'),
  msg: D.string
})

export const DoneD = ciLiteral('Done')
