/*
 * Copyright (C) 2025 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdminService } from '../../../src/clients/admin'
import { AdminServiceImpl } from '../../../src/clients/admin/AdminServiceImpl'
import { resolve } from '../../../src/clients/location/LocationUtils'
import { GATEWAY_CONNECTION } from '../../../src/config/Connections'
import { HttpTransport } from '../../../src/utils/HttpTransport'

jest.mock('../../../src/clients/admin/AdminServiceImpl')
jest.mock('../../../src/clients/location/LocationUtils')
const mockImpl = jest.mocked(AdminServiceImpl)
const mockResolveGateway = jest.mocked(resolve)
const postEndpoint = 'postEndpoint'
mockResolveGateway.mockResolvedValue({
  _type: 'HttpLocation',
  uri: 'http://localhost:1234',
  metadata: {},
  connection: GATEWAY_CONNECTION
})

const adminServiceImpl = new AdminServiceImpl(new HttpTransport(postEndpoint))

describe('Admin Service Factory', () => {
  test('create admin service | ESW-372', async () => {
    mockImpl.mockReturnValue(adminServiceImpl)
    const actualAdminService = await AdminService()

    expect(actualAdminService).toEqual(adminServiceImpl)
  })
})

afterAll(() => jest.resetAllMocks())
