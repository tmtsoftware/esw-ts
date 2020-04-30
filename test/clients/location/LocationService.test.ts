import { LocationService } from 'clients/location/LocationService'
import { HttpLocation, Location } from 'clients/location/models/Location'
import { HttpConnection } from 'clients/location/models/Connection'
import { Prefix } from 'models/params/Prefix'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'
import { HttpRegistration, Registration } from 'clients/location/models/Registration'
import { Done, RegistrationResult } from 'clients/location/models/LocationResponses'

const locationService = new LocationService('localhost', 8080)
jest.mock('utils/Http')
const postMockFn = mocked(post, true)
const uri = 'http://someuri'
const prefix = new Prefix('ESW', 'test')
const httpConnection = new HttpConnection(prefix, 'Assembly')
const httpLocation = new HttpLocation(httpConnection, uri)

describe('LocationService', () => {
  test('should fetch list of registered entries', async () => {
    const expectLocations = [httpLocation]

    postMockFn.mockResolvedValue(expectLocations)

    const locations: Location[] = await locationService.list()
    expect(locations).toEqual(expectLocations)
  })

  test('should register a component', async () => {
    const registration: Registration = new HttpRegistration(httpConnection, 1234, uri)
    const expectLocation = httpLocation

    postMockFn.mockResolvedValue(expectLocation)

    const result: RegistrationResult = await locationService.register(registration)
    expect(result.location).toEqual(expectLocation)

    postMockFn.mockResolvedValue('Done')

    const done = await result.unregister()
    expect(done).toEqual('Done')
  })

  test('should unregister a component', async () => {
    postMockFn.mockResolvedValue('Done')

    const done: Done = await locationService.unregister(httpConnection)
    expect(done).toEqual('Done')
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
