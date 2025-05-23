/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocationService } from '../../../src/clients/location/LocationService'
import { LocationServiceImpl } from '../../../src/clients/location/LocationServiceImpl'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { extractHostPort, getPostEndPoint, getWebSocketEndPoint } from '../../../src/utils/Utils'
import { Ws } from '../../../src/utils/Ws'

jest.mock('../../../src/clients/location/LocationServiceImpl')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = jest.mocked(getPostEndPoint)
const wsMockEndpoint = jest.mocked(getWebSocketEndPoint)
const extractHostPortMock = jest.mocked(extractHostPort)
const mockImpl = jest.mocked(LocationServiceImpl)
const postEndpoint = 'postEndpoint'
const wsEndpoint = 'wsEndpoint'
const tokenFactory = () => 'validtoken'

postMockEndpoint.mockReturnValue(postEndpoint)
wsMockEndpoint.mockReturnValue(wsEndpoint)

const locationServiceImplWithAuth = new LocationServiceImpl(
  new HttpTransport(postEndpoint, { tokenFactory }),
  () => new Ws(wsEndpoint)
)

const locationServiceImpl = new LocationServiceImpl(new HttpTransport(postEndpoint), () => new Ws(wsEndpoint))

describe('Location Service Factory', () => {
  test('create location service with auth | ESW-311, ESW-416', async () => {
    extractHostPortMock.mockReturnValue({ host: 'localhost', port: 7655 })
    const uriWithAuth = { host: 'localhost', port: 7655 }

    mockImpl.mockReturnValue(locationServiceImplWithAuth)
    const actualLocationService = LocationService({ tokenFactory })

    expect(actualLocationService).toEqual(locationServiceImplWithAuth)
    expect(postMockEndpoint).toHaveBeenCalledWith(uriWithAuth)
    expect(wsMockEndpoint).toHaveBeenCalledWith(uriWithAuth)
  })

  test('create location service without auth | ESW-311, ESW-416', async () => {
    const config = { host: 'localhost', port: 7654 }
    extractHostPortMock.mockReturnValue({ host: 'localhost', port: 7654 })
    mockImpl.mockReturnValue(locationServiceImpl)
    const actualLocationService = LocationService()

    expect(actualLocationService).toEqual(locationServiceImpl)
    expect(postMockEndpoint).toHaveBeenCalledWith(config)
    expect(wsMockEndpoint).toHaveBeenCalledWith(config)
  })
})

afterAll(() => jest.resetAllMocks())
