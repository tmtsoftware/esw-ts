/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import * as D from 'io-ts/lib/Decoder'
import { ciLiteral, Decoder } from './Decoder'
import { PrefixD } from './PrefixDecoder'
import type { AlarmKey, AlarmSeverity } from '../clients/alarm'

export const AlarmKeyD: Decoder<AlarmKey> = D.struct({
  prefix: PrefixD,
  name: D.string
})

export const AlarmSeverityD: Decoder<AlarmSeverity> = ciLiteral('Okay', 'Warning', 'Major', 'Indeterminate', 'Critical')
