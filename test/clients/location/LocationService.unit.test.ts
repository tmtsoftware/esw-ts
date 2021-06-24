import { mocked } from 'ts-jest/utils'
import { LocationService } from '../../../src/clients/location/LocationService'
import { LocationServiceImpl } from '../../../src/clients/location/LocationServiceImpl'
import { LocationConfig } from '../../../src/config/LocationConfig'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../../src/utils/Utils'
import { Ws } from '../../../src/utils/Ws'
import { LocationConfigWithAuth } from '../../helpers/LocationConfigWithAuth'

jest.mock('../../../src/config/LocationConfig')
jest.mock('../../../src/clients/location/LocationServiceImpl')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const wsMockEndpoint = mocked(getWebSocketEndPoint)
const mockImpl = mocked(LocationServiceImpl)
const locationConfigMock = mocked(LocationConfig)
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
  test('create location service with auth | ESW-311', async () => {
    const uriWithAuth = { host: LocationConfigWithAuth.host, port: LocationConfigWithAuth.port }
    locationConfigMock.mockResolvedValue(LocationConfigWithAuth)

    mockImpl.mockReturnValue(locationServiceImplWithAuth)
    const actualLocationService = await LocationService({ tokenFactory })

    expect(actualLocationService).toEqual(locationServiceImplWithAuth)
    expect(postMockEndpoint).toBeCalledWith(uriWithAuth)
    expect(wsMockEndpoint).toBeCalledWith(uriWithAuth)
    expect(locationConfigMock).toBeCalled()
  })

  test('create location service without auth | ESW-311', async () => {
    const config = { host: 'localhost', port: 8080 }
    locationConfigMock.mockResolvedValue(config)

    mockImpl.mockReturnValue(locationServiceImpl)
    const actualLocationService = await LocationService()

    expect(actualLocationService).toEqual(locationServiceImpl)
    expect(postMockEndpoint).toBeCalledWith(config)
    expect(wsMockEndpoint).toBeCalledWith(config)
  })
})

afterAll(() => jest.resetAllMocks())
