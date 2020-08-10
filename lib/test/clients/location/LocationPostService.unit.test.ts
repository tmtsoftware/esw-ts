import { Duration, HttpConnection } from '../../../src/clients/location'
import { Prefix } from '../../../src/models'
import * as Req from '../../../src/clients/location/models/PostCommand'
import { mockHttpTransport } from '../../helpers/MockHelpers'
import { LocationServiceImpl } from '../../../src/clients/location/LocationService'

const mockRequestRes = jest.fn()
const locationService = new LocationServiceImpl(mockHttpTransport(mockRequestRes))
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = HttpConnection(prefix, 'Sequencer')

describe('LocationService', () => {
  test('should fetch list of registered entries | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.list()
    expect(mockRequestRes).toBeCalledWith(new Req.ListEntries(), expect.anything())
  })

  test('should unregister a component | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.unregister(httpConnection)
    expect(mockRequestRes).toBeCalledWith(new Req.Unregister(httpConnection), expect.anything())
  })

  test('should return location of given component | ESW-308, ESW-310, ESW-311', async () => {
    const duration = new Duration(5, 'seconds')
    await locationService.resolve(httpConnection, 5, 'seconds')
    expect(mockRequestRes).toBeCalledWith(
      new Req.Resolve(httpConnection, duration),
      expect.anything()
    )
  })

  test('should throw Request timed out when resolve takes more time than threshold | ESW-308, ESW-310, ESW-311', async () => {
    mockRequestRes.mockRejectedValueOnce(() => {
      throw new Error('Request timed out')
    })

    await expect(() => locationService.resolve(httpConnection, 3, 'seconds')).rejects.toThrow(
      'Request timed out'
    )
  })

  test('should fetch list all locations for given componentType | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.listByComponentType('Sequencer')
    expect(mockRequestRes).toBeCalledWith(
      new Req.ListByComponentType('Sequencer'),
      expect.anything()
    )
  })

  test('should fetch list all locations for given hostname | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.listByHostname('someuri')
    expect(mockRequestRes).toBeCalledWith(new Req.ListByHostname('someuri'), expect.anything())
  })

  test('should fetch list all locations for given connectionType | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.listByConnectionType('http')
    expect(mockRequestRes).toBeCalledWith(new Req.ListByConnectionType('http'), expect.anything())
  })

  test('should fetch list all locations for given prefix | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.listByPrefix(prefix)
    expect(mockRequestRes).toBeCalledWith(new Req.ListByPrefix(prefix), expect.anything())
  })

  test('should find a location for given connection | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.find(httpConnection)
    expect(mockRequestRes).toBeCalledWith(new Req.Find(httpConnection), expect.anything())
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
