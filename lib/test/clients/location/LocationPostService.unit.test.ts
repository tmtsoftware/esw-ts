import { DoneD, Duration, HttpConnection, LocationListD } from '../../../src/clients/location'
import { LocationServiceImpl } from '../../../src/clients/location/LocationServiceImpl'
import * as Req from '../../../src/clients/location/models/PostCommand'
import { Prefix } from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'

const mockResponse = Math.random().toString()
const mockRequestRes = jest.fn().mockReturnValue(Promise.resolve(mockResponse))
const locationService = new LocationServiceImpl(mockHttpTransport(mockRequestRes), () =>
  mockWsTransport()
)
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = HttpConnection(prefix, 'Sequencer')

describe('LocationService', () => {
  test('should fetch list of registered entries | ESW-308, ESW-310, ESW-311', async () => {
    const response = await locationService.list()

    expect(response).toEqual(mockResponse)
    expect(mockRequestRes).toBeCalledWith(new Req.ListEntries(), LocationListD)
  })

  test('should unregister a component | ESW-308, ESW-310, ESW-311', async () => {
    const response = await locationService.unregister(httpConnection)

    expect(response).toEqual(mockResponse)
    expect(mockRequestRes).toBeCalledWith(new Req.Unregister(httpConnection), DoneD)
  })

  test('should return undefined when location of given component is not present | ESW-308, ESW-310, ESW-311', async () => {
    const duration = new Duration(5, 'seconds')
    mockRequestRes.mockResolvedValueOnce([])
    const response = await locationService.resolve(httpConnection, 5, 'seconds')

    expect(response).toEqual(undefined)
    expect(mockRequestRes).toBeCalledWith(new Req.Resolve(httpConnection, duration), LocationListD)
  })

  test('should location of given component| ESW-308, ESW-310, ESW-311', async () => {
    const duration = new Duration(5, 'seconds')
    mockRequestRes.mockResolvedValueOnce([mockResponse])
    const response = await locationService.resolve(httpConnection, 5, 'seconds')

    expect(response).toEqual(mockResponse)
    expect(mockRequestRes).toBeCalledWith(new Req.Resolve(httpConnection, duration), LocationListD)
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
    const response = await locationService.listByComponentType('Sequencer')

    expect(response).toEqual(mockResponse)
    expect(mockRequestRes).toBeCalledWith(new Req.ListByComponentType('Sequencer'), LocationListD)
  })

  test('should fetch list all locations for given hostname | ESW-308, ESW-310, ESW-311', async () => {
    const response = await locationService.listByHostname('someuri')

    expect(response).toEqual(mockResponse)
    expect(mockRequestRes).toBeCalledWith(new Req.ListByHostname('someuri'), LocationListD)
  })

  test('should fetch list all locations for given connectionType | ESW-308, ESW-310, ESW-311', async () => {
    const response = await locationService.listByConnectionType('http')

    expect(response).toEqual(mockResponse)
    expect(mockRequestRes).toBeCalledWith(new Req.ListByConnectionType('http'), LocationListD)
  })

  test('should fetch list all locations for given prefix | ESW-308, ESW-310, ESW-311', async () => {
    const response = await locationService.listByPrefix(prefix)

    expect(response).toEqual(mockResponse)
    expect(mockRequestRes).toBeCalledWith(new Req.ListByPrefix(prefix), LocationListD)
  })

  test('should return undefined when find a location for given connection return empty | ESW-308, ESW-310, ESW-311', async () => {
    mockRequestRes.mockResolvedValueOnce([])
    const response = await locationService.find(httpConnection)

    expect(response).toEqual(undefined)
    expect(mockRequestRes).toBeCalledWith(new Req.Find(httpConnection), LocationListD)
  })

  test('should find a location for given connection | ESW-308, ESW-310, ESW-311', async () => {
    mockRequestRes.mockResolvedValueOnce([mockResponse])
    const response = await locationService.find(httpConnection)

    expect(response).toEqual(mockResponse)
    expect(mockRequestRes).toBeCalledWith(new Req.Find(httpConnection), LocationListD)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
