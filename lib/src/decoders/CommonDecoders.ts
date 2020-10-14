import * as D from 'io-ts/lib/Decoder'
import type { Failed, Unhandled } from '../models/common'
import { ciLiteral, Decoder } from '../utils/Decoder'

export const FailedD: Decoder<Failed> = D.type({
  _type: ciLiteral('Failed'),
  msg: D.string
})

export const DoneD = ciLiteral('Done')

export const UnhandledD: Decoder<Unhandled> = D.type({
  _type: ciLiteral('Unhandled'),
  state: D.string,
  messageType: D.string,
  msg: D.string
})
