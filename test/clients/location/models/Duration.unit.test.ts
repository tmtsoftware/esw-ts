/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { Duration } from '../../../../src/clients/location'

describe('Duration', () => {
  test('should format on serialize', () => {
    expect(new Duration(10, 'seconds').toJSON()).toEqual('10 seconds')
  })
})
