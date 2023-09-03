/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/lib/Decoder'
import type { Decoder } from './Decoder'
import { ParameterD } from './ParameterDecoder'
import { Result } from '../models'

export const ResultD: Decoder<Result> = pipe(
  D.struct({
    paramSet: D.array(ParameterD)
  }),
  D.parse((r) => D.success(new Result(r.paramSet)))
)
