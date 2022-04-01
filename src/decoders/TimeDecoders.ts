/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { TAITime, TMTTime, UTCTime } from '../models/TMTTime'
import type { Decoder } from './Decoder'

const dateDecoder = <T extends TMTTime>(timeConstructor: new (date: Date) => T) =>
  pipe(
    D.string,
    D.parse((str: string) => {
      const date = new Date(str)
      return isNaN(date.getTime()) ? D.failure(str, 'Invalid Date') : D.success(new timeConstructor(date))
    })
  )

export const TAITimeD: Decoder<TAITime> = dateDecoder(TAITime)

export const UTCTimeD: Decoder<UTCTime> = dateDecoder(UTCTime)
