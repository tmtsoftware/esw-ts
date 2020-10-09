import * as D from 'io-ts/lib/Decoder'
import type { AlarmKey } from '..'
import { PrefixD } from '../models/params/Prefix'
import { ciLiteral, Decoder } from '../utils/Decoder'

export const AlarmKeyD: Decoder<AlarmKey> = D.type({
  prefix: PrefixD,
  name: D.string
})

export const AlarmSeverityD = ciLiteral('Okay', 'Warning', 'Major', 'Indeterminate', 'Critical')
