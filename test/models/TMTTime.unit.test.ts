/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { TAITime, UTCTime } from '../../src'

describe('TMT Time model', () => {
  test('UTCtime.toTAI() should return TAI time | ESW-542', () => {
    const utcTime = UTCTime.now()

    const taiTime = utcTime.toTAI()
    expect(taiTime).toBeInstanceOf(TAITime)
    expect(taiTime.value.getTime() - utcTime.value.getTime()).toBe(37000)
  })

  test('TAItime.toUTC() should return UTC time | ESW-542', () => {
    const taiTime = TAITime.now()

    const utcTime = taiTime.toUTC()
    expect(utcTime).toBeInstanceOf(UTCTime)
    expect(taiTime.value.getTime() - utcTime.value.getTime()).toBe(37000)
  })
})
