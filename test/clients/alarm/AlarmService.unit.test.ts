/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { GATEWAY_CONNECTION } from '../../../src'
import { AlarmService } from '../../../src/clients/alarm'
import { AlarmServiceImpl } from '../../../src/clients/alarm/AlarmServiceImpl'
import { resolve } from '../../../src/clients/location/LocationUtils'
import { HttpTransport } from '../../../src/utils/HttpTransport'

jest.mock('../../../src/clients/alarm/AlarmServiceImpl')
jest.mock('../../../src/clients/location/LocationUtils')
const mockResolveGateway = jest.mocked(resolve)
const mockImpl = jest.mocked(AlarmServiceImpl)

const postEndpoint = 'postEndpoint'
mockResolveGateway.mockResolvedValue({
  _type: 'HttpLocation',
  uri: 'http://localhost:1234',
  metadata: {},
  connection: GATEWAY_CONNECTION
})

const alarmServiceImpl = new AlarmServiceImpl(new HttpTransport(postEndpoint))

describe('Alarm Service Factory', () => {
  test('create alarm service | ESW-314', async () => {
    mockImpl.mockReturnValue(alarmServiceImpl)
    const a = await AlarmService()

    expect(a).toEqual(alarmServiceImpl)
    expect(mockResolveGateway).toHaveBeenCalledTimes(1)
  })
})

afterAll(() => jest.resetAllMocks())
