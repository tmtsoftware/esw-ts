import { mocked } from 'ts-jest/utils'
import { getPostEndPoint, getWebSocketEndPoint } from '../../../src/utils/Utils'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { WebSocketTransport } from '../../../src/utils/WebSocketTransport'
import { LocationServiceImpl } from '../../../src/clients/location/Impl'
import { LocationService } from '../../../src/clients/location'
import { LocationConfig } from '../../../src/config'
import { LocationServiceWithAuth } from '../../../src/clients/location/LocationService'
import { LocationConfigWithAuth } from '../../../src/config/LocationConfig'

jest.mock('../../../src/clients/location/Impl')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const wsMockEndpoint = mocked(getWebSocketEndPoint)
const mockImpl = mocked(LocationServiceImpl)

const postEndpoint = 'postEndpoint'
const wsEndpoint = 'wsEndpoint'
const tokenFactory = () => 'validtoken'
postMockEndpoint.mockReturnValue(postEndpoint)
wsMockEndpoint.mockReturnValue(wsEndpoint)

const locationServiceImplWithAuth = new LocationServiceImpl(
  new HttpTransport(postEndpoint, tokenFactory),
  () => WebSocketTransport(wsEndpoint)
)

const locationServiceImpl = new LocationServiceImpl(new HttpTransport(postEndpoint), () =>
  WebSocketTransport(wsEndpoint)
)

describe('Location Service Factory', () => {
  test('create location service with auth | ESW-316', async () => {
    const uriWithAuth = { host: LocationConfigWithAuth.hostName, port: LocationConfigWithAuth.port }

    mockImpl.mockReturnValue(locationServiceImplWithAuth)
    const actualLocationService = await LocationServiceWithAuth(tokenFactory)

    expect(actualLocationService).toEqual(locationServiceImplWithAuth)
    expect(postMockEndpoint).toBeCalledWith(uriWithAuth)
    expect(wsMockEndpoint).toBeCalledWith(uriWithAuth)
  })

  test('create location service without auth | ESW-316', async () => {
    const uri = { host: LocationConfig.hostName, port: LocationConfig.port }

    mockImpl.mockReturnValue(locationServiceImpl)
    const actualLocationService = await LocationService()

    expect(actualLocationService).toEqual(locationServiceImpl)
    expect(postMockEndpoint).toBeCalledWith(uri)
    expect(wsMockEndpoint).toBeCalledWith(uri)
  })
})

afterAll(() => jest.resetAllMocks())
