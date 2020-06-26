import { ConfigService } from '../../../src/clients/config/ConfigService'
import { mocked } from 'ts-jest/utils'
import { get, head, post } from '../../../src/utils/Http'
import { HttpLocation } from '../../../src/clients/location'
import { configConnection } from '../../../src/utils/ServicesConnections'

jest.mock('../../../src/utils/Http')
const getMockFn = mocked(get, true)
const postMockFn = mocked(post, true)
const headMockFn = mocked(head, true)

const uri = 'http://localhost:8080'
const configLocation = new HttpLocation(configConnection, uri)

describe('ConfigService', () => {
  test('should get the latest conf of given path from the config server | ESW-320', () => {
    return new Promise((done) => {
      const configService = new ConfigService(() => '')
      const confPath = 'tmt/assembly.conf'

      postMockFn.mockResolvedValueOnce([configLocation])
      getMockFn.mockResolvedValueOnce('foo: bar')

      configService.getLatest(confPath, (confData, path) => {
        expect(confData).toBe('foo: bar')
        expect(path).toBe('assembly.conf')
        expect(getMockFn).toBeCalledWith('localhost', 8080, {
          path: `config/${confPath}`,
          parser: expect.any(Function)
        })
        done()
      })
    })
  })

  test('should get the conf of given path and given id from the config server | ESW-320', () => {
    return new Promise((done) => {
      const configService = new ConfigService(() => '')
      const confPath = 'tmt/assembly.conf'
      const configId = 'configId123'

      postMockFn.mockResolvedValueOnce([configLocation])
      getMockFn.mockResolvedValueOnce('foo: bar')

      configService.getById(confPath, configId, (confData, path) => {
        expect(confData).toBe('foo: bar')
        expect(path).toBe(`assembly.conf?id=${configId}`)
        expect(getMockFn).toBeCalledWith('localhost', 8080, {
          path: `config/${confPath}?id=${configId}`,
          parser: expect.any(Function)
        })
        done()
      })
    })
  })

  test('should get the conf of given path and given time from the config server | ESW-320', () => {
    return new Promise((done) => {
      const configService = new ConfigService(() => '')
      const confPath = 'tmt/assembly.conf'
      const date = new Date()

      postMockFn.mockResolvedValueOnce([configLocation])
      getMockFn.mockResolvedValueOnce('foo: bar')

      configService.getByTime(confPath, date, (confData, path) => {
        expect(confData).toBe('foo: bar')
        expect(path).toBe(`assembly.conf?date=${date}`)
        expect(getMockFn).toBeCalledWith('localhost', 8080, {
          path: `config/${confPath}?date=${date}`,
          parser: expect.any(Function)
        })
        done()
      })
    })
  })

  test('should check if the given conf is present | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'

    postMockFn.mockResolvedValueOnce([configLocation])
    headMockFn.mockResolvedValueOnce(true)

    const actualRes = await configService.exists(confPath)
    expect(actualRes).toBe(true)
    expect(headMockFn).toBeCalledWith('localhost', 8080, { path: `config/${confPath}` })
  })

  test('should check if the given conf with given id is present | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const configId = 'configId123'

    postMockFn.mockResolvedValueOnce([configLocation])
    headMockFn.mockResolvedValueOnce(true)

    const actualRes = await configService.exists(confPath, configId)
    expect(actualRes).toBe(true)
    expect(headMockFn).toBeCalledWith('localhost', 8080, {
      path: `config/${confPath}?id=${configId}`
    })
  })
})
