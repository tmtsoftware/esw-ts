/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import type { Key } from '../models'
import { Parameter } from '../models'
import { Decoder, object } from './Decoder'
import { paramDecoders } from './KeyDecoders'

const decodeParameter = () =>
  pipe(
    object(paramDecoders),
    D.parse(([key, body]) => D.success(new Parameter(body.keyName, key as any, body.values as any, body.units)))
  )

export const ParameterD: Decoder<Parameter<Key>> = D.lazy('Parameter<Key>', decodeParameter)
