import { LocationService } from 'clients/location/LocationService'
import { HttpLocation, TypedLocation } from 'clients/location/models/Location'
import { HttpConnection } from 'clients/location/models/Connection'
import { Prefix } from 'models/params/Prefix'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'

const locationService = new LocationService('localhost', 8080)
jest.mock('utils/Http')
const postMockFn = mocked(post, true)

describe('LocationService', () => {
  test('should fetch list of registered entries', async () => {
    const uri = 'http://someuri'
    const prefix = new Prefix('ESW', 'test')
    const httpConnection = new HttpConnection(prefix, 'Assembly')
    const httpLocation = new HttpLocation(httpConnection, uri)
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: TypedLocation[] = await locationService.list()
    expect(locations).toEqual(expectLocations)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
