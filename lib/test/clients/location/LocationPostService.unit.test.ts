import {
  Done,
  Duration,
  HttpConnection,
  HttpLocation,
  Location,
  LocationService
} from '../../../src/clients/location'
import { Prefix } from '../../../src/models'
import { mocked } from 'ts-jest/utils'
import { post } from '../../../src/utils/Http'

const locationService = new LocationService()
jest.mock('../../../src/utils/Http')
const postMockFn = mocked(post, true)
const uri = 'http://someuri'
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = HttpConnection(prefix, 'Sequencer')
const httpLocation: HttpLocation = { _type: 'HttpLocation', connection: httpConnection, uri }

describe('LocationService', () => {
  test('should fetch list of registered entries | ESW-308, ESW-310, ESW-311', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.list()
    expect(locations).toEqual(expectLocations)
  })

  test('should unregister a component | ESW-308, ESW-310, ESW-311', async () => {
    postMockFn.mockResolvedValue('Done')

    const done: Done = await locationService.unregister(httpConnection)
    expect(done).toEqual('Done')
  })

  test('should return location of given component | ESW-308, ESW-310, ESW-311', async () => {
    const expectLocation = [httpLocation]
    postMockFn.mockResolvedValue(expectLocation)

    const actualLocation = await locationService.resolve(httpConnection, new Duration(5, 'seconds'))
    expect(actualLocation).toEqual(httpLocation)
  })

  test('should throw Request timed out when resolve takes more time than threshold | ESW-308, ESW-310, ESW-311', async () => {
    postMockFn.mockRejectedValueOnce(() => {
      throw new Error('Request timed out')
    })

    await expect(() =>
      locationService.resolve(httpConnection, new Duration(3, 'seconds'))
    ).rejects.toThrow('Request timed out')
  })

  test('should fetch list all locations for given componentType | ESW-308, ESW-310, ESW-311', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.listByComponentType('Sequencer')
    expect(locations).toEqual(expectLocations)
  })

  test('should fetch list all locations for given hostname | ESW-308, ESW-310, ESW-311', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.listByHostname('someuri')
    expect(locations).toEqual(expectLocations)
  })

  test('should fetch list all locations for given connectionType | ESW-308, ESW-310, ESW-311', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.listByConnectionType('http')
    expect(locations).toEqual(expectLocations)
  })

  test('should fetch list all locations for given prefix | ESW-308, ESW-310, ESW-311', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.listByPrefix(prefix)
    expect(locations).toEqual(expectLocations)
  })

  test('should find a location for given connection | ESW-308, ESW-310, ESW-311', async () => {
    const expectLocation = [httpLocation]

    postMockFn.mockResolvedValueOnce(expectLocation)

    const location = await locationService.find(httpConnection)
    expect(location).toEqual(httpLocation)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
