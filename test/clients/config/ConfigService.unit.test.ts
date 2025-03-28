/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { CONFIG_CONNECTION, TokenFactory } from '../../../src'
import { ConfigService } from '../../../src/clients/config-service'
import { ConfigServiceImpl } from '../../../src/clients/config-service/ConfigServiceImpl'
import { resolve } from '../../../src/clients/location/LocationUtils'

jest.mock('../../../src/clients/config-service/ConfigServiceImpl')
jest.mock('../../../src/clients/location/LocationUtils')
const mockResolveConfigServer = jest.mocked(resolve)
const mockImpl = jest.mocked(ConfigServiceImpl)

const uri = { host: '123', port: 1234 }
const tokenFactory: TokenFactory = () => 'validToken'
mockResolveConfigServer.mockResolvedValue({
  _type: 'HttpLocation',
  uri: 'http://localhost:1234',
  metadata: {},
  connection: CONFIG_CONNECTION
})

const configServiceImpl = new ConfigServiceImpl(uri.host, uri.port, tokenFactory)

describe('Config Service Factory', () => {
  test('create config service | ESW-320', async () => {
    mockImpl.mockReturnValue(configServiceImpl)
    const a = await ConfigService(tokenFactory)

    expect(a).toEqual(configServiceImpl)
    expect(mockResolveConfigServer).toHaveBeenCalledTimes(1)
  })
})

afterAll(() => jest.resetAllMocks())
