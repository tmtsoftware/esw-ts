/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/lib/Decoder'
import { Units } from '../models/params/Units'
import { ciLiteral, Decoder } from './Decoder'

const allUnits = Units.values()
const unitsKeys = Object.keys(allUnits)
const UnitsKeyD = ciLiteral(unitsKeys[0], ...unitsKeys.slice(1))

export const UnitsD: Decoder<Units> = pipe(
  UnitsKeyD,
  D.parse((str) => {
    return D.success(allUnits[str])
  })
)
