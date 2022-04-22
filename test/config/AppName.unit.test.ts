/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { getAppName, setAppName } from '../../src/config/AppName'

describe('App Name', () => {
  test('should return unknown when application name does not exist | ESW-312', async () => {
    expect.assertions(1)

    expect(() => getAppName()).toThrow('Application Name is not set, set it using setAppName function')
  })
  test('should be able to decode application name from config | ESW-312', async () => {
    const expected = 'test-app'
    setAppName('test-app')

    const config = getAppName()
    expect(config).toEqual(expected)
  })
})
