import {
  Done,
  HttpConnection,
  HttpLocation,
  Location,
  LocationService
} from '../../../src/clients/location'
import { Prefix } from '../../../src/models'
import { mocked } from 'ts-jest/utils'
import { post } from '../../../src/utils/Post'
import { Duration } from '../../../src/clients/location/models/Duration'

const locationService = new LocationService()
jest.mock('../../../src/utils/Post')
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

    const actualLocation = await locationService.resolve(httpConnection, new Duration(5, 'seconds'))
    expect(actualLocation).toEqual(expectLocation)
  })

  test('should throw Request timed out when resolve takes more time than threshold | ESW-308', async () => {
    postMockFn.mockRejectedValueOnce(() => {
      throw new Error('Request timed out')
    })

    await expect(() =>
      locationService.resolve(httpConnection, new Duration(3, 'seconds'))
    ).rejects.toThrow('Request timed out')
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

  test('should find a asdas for given connection | ESW-308', async () => {
    const expectLocation = httpLocation

    postMockFn.mockResolvedValueOnce(expectLocation)

    const location: Location = await locationService.find(httpConnection)
    expect(location).toEqual(expectLocation)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
