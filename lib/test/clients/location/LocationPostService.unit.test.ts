import { mocked } from 'ts-jest/utils'
import { AkkaLocation, Duration, HttpConnection } from '../../../src/clients/location'
import { LocationServiceImpl } from '../../../src/clients/location/LocationServiceImpl'
import type { LocationHttpMessage } from '../../../src/clients/location/models/PostCommand'
import * as Req from '../../../src/clients/location/models/PostCommand'
import type { LocationWebSocketMessage } from '../../../src/clients/location/models/WsCommand'
import { DoneD } from '../../../src/decoders/CommonDecoders'
import { LocationListD } from '../../../src/decoders/LocationDecoders'
import { Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const mockDoneResponse = 'Done'
const mockLocationResponse: AkkaLocation = {
  _type: 'AkkaLocation',
  connection: {
    prefix: new Prefix('ESW', 'comp1'),
    componentType: 'HCD',
    connectionType: 'akka'
  },
  uri: 'path',
  metadata: {
    key1: 'value'
  }
}
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = HttpConnection(prefix, 'Sequencer')

const httpTransport: HttpTransport<LocationHttpMessage> = new HttpTransport('someUrl')
const mockHttpTransport = mocked(httpTransport)

const ws: Ws<LocationWebSocketMessage> = new Ws('someUrl')
const locationService = new LocationServiceImpl(httpTransport, () => ws)

describe('LocationService', () => {
  test('should fetch list of registered entries | ESW-308, ESW-310, ESW-311', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce([mockLocationResponse])
    const response = await locationService.list()

    expect(response).toEqual([mockLocationResponse])
    verify(mockHttpTransport.requestRes).toBeCalledWith(new Req.ListEntries(), LocationListD)
  })

  test('should unregister a component | ESW-308, ESW-310, ESW-311', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce(mockDoneResponse)

    const response = await locationService.unregister(httpConnection)

    expect(response).toEqual(mockDoneResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(new Req.Unregister(httpConnection), DoneD)
  })

  test('should return undefined when location of given component is not present | ESW-308, ESW-310, ESW-311', async () => {
    const duration = new Duration(5, 'seconds')
    mockHttpTransport.requestRes.mockResolvedValueOnce([])

    const response = await locationService.resolve(httpConnection, 5, 'seconds')

    expect(response).toEqual(undefined)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.Resolve(httpConnection, duration),
      LocationListD
    )
  })

  test('should location of given component| ESW-308, ESW-310, ESW-311', async () => {
    const duration = new Duration(5, 'seconds')
    mockHttpTransport.requestRes.mockResolvedValueOnce([mockLocationResponse])

    const response = await locationService.resolve(httpConnection, 5, 'seconds')

    expect(response).toEqual(mockLocationResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.Resolve(httpConnection, duration),
      LocationListD
    )
  })

  test('should throw Request timed out when resolve takes more time than threshold | ESW-308, ESW-310, ESW-311', async () => {
    mockHttpTransport.requestRes.mockRejectedValueOnce(() => {
      throw new Error('Request timed out')
    })

    await expect(() => locationService.resolve(httpConnection, 3, 'seconds')).rejects.toThrow(
      'Request timed out'
    )
  })

  test('should fetch list all locations for given componentType | ESW-308, ESW-310, ESW-311', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce([mockLocationResponse])

    const response = await locationService.listByComponentType('Sequencer')

    expect(response).toEqual([mockLocationResponse])
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ListByComponentType('Sequencer'),
      LocationListD
    )
  })

  test('should fetch list all locations for given hostname | ESW-308, ESW-310, ESW-311', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce([mockLocationResponse])

    const response = await locationService.listByHostname('someuri')

    expect(response).toEqual([mockLocationResponse])
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ListByHostname('someuri'),
      LocationListD
    )
  })

  test('should fetch list all locations for given connectionType | ESW-308, ESW-310, ESW-311', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce([mockLocationResponse])

    const response = await locationService.listByConnectionType('http')

    expect(response).toEqual([mockLocationResponse])
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ListByConnectionType('http'),
      LocationListD
    )
  })

  test('should fetch list all locations for given prefix | ESW-308, ESW-310, ESW-311', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce([mockLocationResponse])

    const response = await locationService.listByPrefix(prefix)

    expect(response).toEqual([mockLocationResponse])
    verify(mockHttpTransport.requestRes).toBeCalledWith(new Req.ListByPrefix(prefix), LocationListD)
  })

  test('should return undefined when find a location for given connection return empty | ESW-308, ESW-310, ESW-311', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce([])
    const response = await locationService.find(httpConnection)

    expect(response).toEqual(undefined)
    verify(mockHttpTransport.requestRes).toBeCalledWith(new Req.Find(httpConnection), LocationListD)
  })

  test('should find a location for given connection | ESW-308, ESW-310, ESW-311', async () => {
    mockHttpTransport.requestRes.mockResolvedValueOnce([mockLocationResponse])
    const response = await locationService.find(httpConnection)

    expect(response).toEqual(mockLocationResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(new Req.Find(httpConnection), LocationListD)
  })
})

afterEach(() => jest.clearAllMocks())
