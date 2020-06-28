import { mocked } from 'ts-jest/utils'
import { ConfigService } from '../../../src/clients/config/ConfigService'
import { HttpLocation } from '../../../src/clients/location'
import { configConnection } from '../../../src/config/connections'
import { get, head, post } from '../../../src/utils/Http'

jest.mock('../../../src/utils/Http')
const getMockFn = mocked(get, true)
const postMockFn = mocked(post, true)
const headMockFn = mocked(head, true)

const uri = 'http://localhost:8080'
const configLocation = new HttpLocation(configConnection, uri)

const configEndpoint = (path: string) => `http://localhost:8080/config/${path}`

describe('ConfigService', () => {
  test('should get the latest conf of given path from the config server | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const endpoint = configEndpoint(confPath)
    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce('foo: bar')

    const confData = await configService.getLatest(confPath)
    expect(confData).toBe('foo: bar')
    expect(getMockFn).toBeCalledWith({ endpoint, responseMapper: expect.any(Function) })
  })

  test('should get the conf of given path and given id from the config server | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const configId = 'configId123'
    const endpoint = configEndpoint(`${confPath}?id=${configId}`)

    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce('foo: bar')

    const confData = await configService.getById(confPath, configId)
    expect(confData).toBe('foo: bar')
    expect(getMockFn).toBeCalledWith({ endpoint, responseMapper: expect.any(Function) })
  })

  test('should get the conf of given path and given time from the config server | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const date = new Date()
    const endpoint = configEndpoint(`${confPath}?date=${date}`)

    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce('foo: bar')

    const confData = await configService.getByTime(confPath, date)
    expect(confData).toBe('foo: bar')
    expect(getMockFn).toBeCalledWith({ endpoint, responseMapper: expect.any(Function) })
  })

  test('should check if the given conf is present | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const endpoint = configEndpoint(confPath)

    postMockFn.mockResolvedValueOnce([configLocation])
    headMockFn.mockResolvedValueOnce(true)

    const actualRes = await configService.exists(confPath)
    expect(actualRes).toBe(true)
    expect(headMockFn).toBeCalledWith({ endpoint })
  })

  test('should check if the given conf with given id is present | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const configId = 'configId123'
    const endpoint = configEndpoint(`${confPath}?id=${configId}`)

    postMockFn.mockResolvedValueOnce([configLocation])
    headMockFn.mockResolvedValueOnce(true)

    const actualRes = await configService.exists(confPath, configId)
    expect(actualRes).toBe(true)
    expect(headMockFn).toBeCalledWith({ endpoint })
  })
})
