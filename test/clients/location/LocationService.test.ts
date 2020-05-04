import { LocationService } from 'clients/location/LocationService'
import { HttpConnection } from 'clients/location/models/Connection'
import { HttpLocation, Location } from 'clients/location/models/Location'
import { Done } from 'clients/location/models/LocationResponses'
import { Prefix } from 'models/params/Prefix'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'

const locationService = new LocationService('localhost', 7654)
jest.mock('utils/Http')
const postMockFn = mocked(post, true)
const uri = 'http://someuri'
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = new HttpConnection(prefix, 'Sequencer')
const httpLocation = new HttpLocation(httpConnection, uri)

describe('LocationService', () => {
  test('should fetch list of registered entries | ESW-308', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.list()
    expect(locations).toEqual(expectLocations)
  })

  test('should unregister a component | ESW-308', async () => {
    postMockFn.mockResolvedValue('Done')

    const done: Done = await locationService.unregister(httpConnection)
    expect(done).toEqual('Done')
  })

  test('should return location of given component | ESW-308', async () => {
    const expectLocation = [httpLocation]
    postMockFn.mockResolvedValue(expectLocation)

    const actualLocation = await locationService.resolve(httpConnection, 5)
    expect(actualLocation).toEqual(expectLocation)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
