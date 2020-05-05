import { Done, HttpConnection, HttpLocation, Location, LocationService } from 'clients/location'
import { Prefix } from 'models'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/post'

const locationService = new LocationService()
jest.mock('utils/post')
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

  test('should fetch list all locations for given componentType | ESW-308', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.listByComponentType('Sequencer')
    expect(locations).toEqual(expectLocations)
  })

  test('should fetch list all locations for given hostname | ESW-308', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.listByHostname('someuri')
    expect(locations).toEqual(expectLocations)
  })

  test('should fetch list all locations for given connectionType | ESW-308', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.listByConnectionType('http')
    expect(locations).toEqual(expectLocations)
  })

  test('should fetch list all locations for given prefix | ESW-308', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.listByPrefix(prefix)
    expect(locations).toEqual(expectLocations)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
