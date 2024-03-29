/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Subsystem } from '..'
import { ciLiteral, Decoder } from './Decoder'

export const SubsystemD: Decoder<Subsystem> = ciLiteral(
  'AOESW',
  'APS',
  'CIS',
  'CLN',
  'CRYO',
  'CSW',
  'DMS',
  'DPS',
  'ENC',
  'ESEN',
  'ESW',
  'HNDL',
  'HQ',
  'IRIS',
  'LGSF',
  'M1COAT',
  'M1CS',
  'M1S',
  'M2COAT',
  'M2S',
  'M3S',
  'MODHIS',
  'NFIRAOS',
  'OSS',
  'REFR',
  'SCMS',
  'SER',
  'SOSS',
  'STR',
  'SUM',
  'TCS',
  'TINS',
  'WFOS',
  'Container'
)
