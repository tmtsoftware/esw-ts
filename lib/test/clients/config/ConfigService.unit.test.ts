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
const activeConfigEndpoint = (path: string) => `http://localhost:8080/active-config/${path}`
const activeVersionEndpoint = (path: string) => `http://localhost:8080/active-version/${path}`

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
    const configId = { id: 'configId123' }
    const endpoint = configEndpoint(`${confPath}?id=${configId.id}`)

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
    const configId = { id: 'configId123' }
    const endpoint = configEndpoint(`${confPath}?id=${configId.id}`)

    postMockFn.mockResolvedValueOnce([configLocation])
    headMockFn.mockResolvedValueOnce(true)

    const actualRes = await configService.exists(confPath, configId)
    expect(actualRes).toBe(true)
    expect(headMockFn).toBeCalledWith({ endpoint })
  })

  test('should list all the config if there is not type(fileType) or pattern defined | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const endpoint = configEndpoint('list')

    const firstConfInfo = {
      path: 'firstConf',
      id: 'id123',
      author: 'Admin',
      comment: 'comment1'
    }

    const secondConfInfo = {
      path: 'secondConf',
      id: 'id234',
      author: 'Author1',
      comment: 'comment2'
    }

    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce([firstConfInfo, secondConfInfo])

    const actualRes = await configService.list()
    expect(actualRes).toEqual([firstConfInfo, secondConfInfo])
    expect(getMockFn).toBeCalledWith({ endpoint, parameters: {} })
  })

  test('should list all the config for given type(fileType) and pattern | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const endpoint = configEndpoint(`list`)

    const firstConfInfo = {
      path: 'firstConf',
      id: 'id123',
      author: 'Admin',
      comment: 'comment1'
    }

    const secondConfInfo = {
      path: 'secondConf',
      id: 'id234',
      author: 'Author1',
      comment: 'comment2'
    }

    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce([firstConfInfo, secondConfInfo])

    const actualRes = await configService.list('Annex', '*')
    expect(actualRes).toEqual([firstConfInfo, secondConfInfo])
    expect(getMockFn).toBeCalledWith({ endpoint, parameters: { type: 'Annex', pattern: '*' } })
  })

  test('should get the active conf of given path from the config server | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const endpoint = activeConfigEndpoint(`${confPath}`)

    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce('foo: bar')

    const confData = await configService.getActive(confPath)
    expect(confData).toBe('foo: bar')
    expect(getMockFn).toBeCalledWith({ endpoint, responseMapper: expect.any(Function) })
  })

  test('should get the active conf of given path and given time from the config server | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const date = new Date()
    const endpoint = activeConfigEndpoint(`${confPath}?date=${date}`)

    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce('foo: bar')

    const confData = await configService.getActiveByTime(confPath, date)
    expect(confData).toBe('foo: bar')
    expect(getMockFn).toBeCalledWith({ endpoint, responseMapper: expect.any(Function) })
  })

  test('should get the active version of the conf | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const endpoint = activeVersionEndpoint(confPath)
    const configId = { id: 'configId123' }

    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce([configId])

    const actualConfId = await configService.getActiveVersion(confPath)
    expect(actualConfId).toEqual([configId])
    expect(getMockFn).toBeCalledWith({ endpoint })
  })
})
