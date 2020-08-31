import { mocked } from 'ts-jest/utils'
import { AdminService } from '../../../src/clients/admin'
import { AdminServiceImpl } from '../../../src/clients/admin/AdminServiceImpl'
import { resolveConnection } from '../../../src/config/Connections'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { getPostEndPoint } from '../../../src/utils/Utils'

jest.mock('../../../src/clients/admin/AdminServiceImpl')
jest.mock('../../../src/config/Connections')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const mockResolveGateway = mocked(resolveConnection)
const mockImpl = mocked(AdminServiceImpl)

const postEndpoint = 'postEndpoint'
const uri = { host: '123', port: 1234 }
mockResolveGateway.mockResolvedValue(uri)
postMockEndpoint.mockReturnValue(postEndpoint)

const adminServiceImpl = new AdminServiceImpl(new HttpTransport(postEndpoint))

describe('Admin Service Factory', () => {
  test('create admin service | ESW-372', async () => {
    mockImpl.mockReturnValue(adminServiceImpl)
    const actualAdminService = await AdminService()

    expect(actualAdminService).toEqual(adminServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
    expect(postMockEndpoint).toBeCalledWith(uri)
  })
})

afterAll(() => jest.resetAllMocks())
