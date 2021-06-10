import * as D from 'io-ts/lib/Decoder'
import type { AlarmKey, AlarmSeverity } from '../clients/alarm'
import { ciLiteral, Decoder } from './Decoder'
import { PrefixD } from './PrefixDecoder'

export const AlarmKeyD: Decoder<AlarmKey> = D.struct({
  prefix: PrefixD,
  name: D.string
})

export const AlarmSeverityD: Decoder<AlarmSeverity> = ciLiteral(
  'Okay',
  'Warning',
  'Major',
  'Indeterminate',
  'Critical'
)
