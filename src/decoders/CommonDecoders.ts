import * as D from 'io-ts/lib/Decoder'
import type { Failed, LocationServiceError, Unhandled } from '../models'
import { ciLiteral, Decoder } from './Decoder'

export const BooleanD = D.boolean
export const StringD = D.string

export const FailedD: Decoder<Failed> = D.struct({
  _type: ciLiteral('Failed'),
  msg: D.string
})

export const DoneD = ciLiteral('Done')

export const UnhandledD: Decoder<Unhandled> = D.struct({
  _type: ciLiteral('Unhandled'),
  state: D.string,
  messageType: D.string,
  msg: D.string
})

export const LocationServiceErrorD: Decoder<LocationServiceError> = D.struct({
  _type: ciLiteral('LocationServiceError'),
  reason: D.string
})
