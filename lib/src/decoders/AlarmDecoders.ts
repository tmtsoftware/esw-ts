import * as D from 'io-ts/lib/Decoder'
import type { AlarmKey } from '../clients/alarm/models/PostCommand'
import { ciLiteral, Decoder } from '../utils/Decoder'
import { PrefixD } from './PrefixDecoder'

export const AlarmKeyD: Decoder<AlarmKey> = D.type({
  prefix: PrefixD,
  name: D.string
})

export const AlarmSeverityD = ciLiteral('Okay', 'Warning', 'Major', 'Indeterminate', 'Critical')
