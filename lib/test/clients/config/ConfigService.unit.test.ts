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
  test('should get the latest conf of given path from the config server | ESW-320', () => {
    return new Promise((done) => {
      const configService = new ConfigService(() => '')
      const confPath = 'tmt/assembly.conf'
      const endpoint = configEndpoint(confPath)
      postMockFn.mockResolvedValueOnce([configLocation])
      getMockFn.mockResolvedValueOnce('foo: bar')

      configService.getLatest(confPath, (confData, path) => {
        expect(confData).toBe('foo: bar')
        expect(path).toBe('assembly.conf')
        expect(getMockFn).toBeCalledWith({ endpoint, responseMapper: expect.any(Function) })
        done()
      })
    })
  })

  test('should get the conf of given path and given id from the config server | ESW-320', () => {
    return new Promise((done) => {
      const configService = new ConfigService(() => '')
      const confPath = 'tmt/assembly.conf'
      const configId = 'configId123'
      const endpoint = configEndpoint(`${confPath}?id=${configId}`)

      postMockFn.mockResolvedValueOnce([configLocation])
      getMockFn.mockResolvedValueOnce('foo: bar')

      configService.getById(confPath, configId, (confData, path) => {
        expect(confData).toBe('foo: bar')
        expect(path).toBe(`assembly.conf?id=${configId}`)
        expect(getMockFn).toBeCalledWith({ endpoint, responseMapper: expect.any(Function) })
        done()
      })
    })
  })

  test('should get the conf of given path and given time from the config server | ESW-320', () => {
    return new Promise((done) => {
      const configService = new ConfigService(() => '')
      const confPath = 'tmt/assembly.conf'
      const date = new Date()
      const endpoint = configEndpoint(`${confPath}?date=${date}`)

      postMockFn.mockResolvedValueOnce([configLocation])
      getMockFn.mockResolvedValueOnce('foo: bar')

      configService.getByTime(confPath, date, (confData, path) => {
        expect(confData).toBe('foo: bar')
        expect(path).toBe(`assembly.conf?date=${date}`)
        expect(getMockFn).toBeCalledWith({ endpoint, responseMapper: expect.any(Function) })
        done()
      })
    })
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
