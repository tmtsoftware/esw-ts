import { Duration, HttpConnection, LocationList, Done } from '../../../src/clients/location'
import { Prefix } from '../../../src/models'
import * as Req from '../../../src/clients/location/models/PostCommand'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import { LocationServiceImpl } from '../../../src/clients/location/LocationServiceImpl'

const mockRequestRes = jest.fn()
const locationService = new LocationServiceImpl(mockHttpTransport(mockRequestRes), () =>
  mockWsTransport()
)
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = HttpConnection(prefix, 'Sequencer')

describe('LocationService', () => {
  test('should fetch list of registered entries | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.list()
    expect(mockRequestRes).toBeCalledWith(new Req.ListEntries(), LocationList)
  })

  test('should unregister a component | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.unregister(httpConnection)
    expect(mockRequestRes).toBeCalledWith(new Req.Unregister(httpConnection), Done)
  })

  test('should return location of given component | ESW-308, ESW-310, ESW-311', async () => {
    const duration = new Duration(5, 'seconds')
    mockRequestRes.mockResolvedValueOnce([])
    await locationService.resolve(httpConnection, 5, 'seconds')
    expect(mockRequestRes).toBeCalledWith(new Req.Resolve(httpConnection, duration), LocationList)
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
    expect(mockRequestRes).toBeCalledWith(new Req.ListByComponentType('Sequencer'), LocationList)
  })

  test('should fetch list all locations for given hostname | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.listByHostname('someuri')
    expect(mockRequestRes).toBeCalledWith(new Req.ListByHostname('someuri'), LocationList)
  })

  test('should fetch list all locations for given connectionType | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.listByConnectionType('http')
    expect(mockRequestRes).toBeCalledWith(new Req.ListByConnectionType('http'), LocationList)
  })

  test('should fetch list all locations for given prefix | ESW-308, ESW-310, ESW-311', async () => {
    await locationService.listByPrefix(prefix)
    expect(mockRequestRes).toBeCalledWith(new Req.ListByPrefix(prefix), LocationList)
  })

  test('should find a location for given connection | ESW-308, ESW-310, ESW-311', async () => {
    mockRequestRes.mockResolvedValueOnce([])
    await locationService.find(httpConnection)
    expect(mockRequestRes).toBeCalledWith(new Req.Find(httpConnection), LocationList)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
