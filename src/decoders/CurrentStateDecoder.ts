/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import type { Decoder } from './Decoder'
import { ParameterD } from './ParameterDecoder'
import { PrefixD } from './PrefixDecoder'
import { CurrentState } from '../models'

// todo: scala has state variable ADT (CurrentState | DemandState)
// _type: "CurrentState" prop present in json coming from scala
export const CurrentStateD: Decoder<CurrentState> = pipe(
  D.struct({
    prefix: PrefixD,
    stateName: D.string,
    paramSet: D.array(ParameterD)
  }),
  D.parse((cs) => D.success(new CurrentState(cs.prefix, cs.stateName, cs.paramSet)))
)
