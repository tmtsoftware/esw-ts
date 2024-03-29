/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prefix } from '../../src/models'

describe('Prefix', () => {
  test("cannot have '-' in component name  | ESW-305", () => {
    expect(() => new Prefix('ESW', 'comp-1')).toThrow(Error)
  })

  test('from string  | ESW-305', () => {
    expect(Prefix.fromString('ESW.comp1')).toEqual(new Prefix('ESW', 'comp1'))
  })
})
