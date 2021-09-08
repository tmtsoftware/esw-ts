import { mocked } from 'ts-jest/utils'
import { LocationService } from '../../../src/clients/location/LocationService'
import { LocationServiceImpl } from '../../../src/clients/location/LocationServiceImpl'
import { GlobalConfig } from '../../../src/config/GlobalConfig'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../../src/utils/Utils'
import { Ws } from '../../../src/utils/Ws'

jest.mock('../../../src/config/GlobalConfig')
jest.mock('../../../src/clients/location/LocationServiceImpl')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const wsMockEndpoint = mocked(getWebSocketEndPoint)
const mockImpl = mocked(LocationServiceImpl)
const locationConfigMock = mocked(GlobalConfig)
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
    const uriWithAuth = 'localhost:7655'
    locationConfigMock.locationUrl = uriWithAuth

    mockImpl.mockReturnValue(locationServiceImplWithAuth)
    const actualLocationService = LocationService({ tokenFactory })

    expect(actualLocationService).toEqual(locationServiceImplWithAuth)
    expect(postMockEndpoint).toBeCalledWith(uriWithAuth)
    expect(wsMockEndpoint).toBeCalledWith(uriWithAuth)
    expect(locationConfigMock).toBeCalled()
  })

  test('create location service without auth | ESW-311', async () => {
    const config = 'localhost:8080'
    locationConfigMock.locationUrl = config

    mockImpl.mockReturnValue(locationServiceImpl)
    const actualLocationService = LocationService()

    expect(actualLocationService).toEqual(locationServiceImpl)
    expect(postMockEndpoint).toBeCalledWith(config)
    expect(wsMockEndpoint).toBeCalledWith(config)
  })
})

afterAll(() => jest.resetAllMocks())
