import { mocked } from 'ts-jest/utils'
import { ConfigService } from '../../../src/clients/config/ConfigService'
import { HttpLocation } from '../../../src/clients/location'
import { configConnection } from '../../../src/config/connections'
import { del, get, head, post, put } from '../../../src/utils/Http'
import { HeaderExt } from '../../../src/utils/HeaderExt'

jest.mock('../../../src/utils/Http')
const getMockFn = mocked(get, true)
const postMockFn = mocked(post, true)
const headMockFn = mocked(head, true)
const putMockFn = mocked(put, true)
const deleteMockFn = mocked(del, true)

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

  test('should get metadata | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const endpoint = 'http://localhost:8080/metadata'

    const expectedConfigMetadata = {
      repoPath: confPath,
      annexPath: confPath,
      annexMinFileSize: '1MB',
      maxConfigFileSize: '1MB'
    }

    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce(expectedConfigMetadata)

    const configMetadata = await configService.getMetadata()
    expect(configMetadata).toEqual(expectedConfigMetadata)
    expect(getMockFn).toBeCalledWith({ endpoint })
  })

  test('should get the history for the given config path | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const from = new Date(2020, 4)
    const to = new Date(2020, 5)
    const maxResults = 10
    const endpoint = `http://localhost:8080/history/${confPath}`

    const revision = {
      id: { id: '15265' },
      author: 'author1',
      comment: 'something',
      time: new Date()
    }
    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce([revision])

    const history = await configService.history(confPath, from, to, maxResults)
    expect(history).toEqual([revision])
    expect(getMockFn).toBeCalledWith({
      endpoint,
      parameters: {
        from: from.toUTCString(),
        to: to.toUTCString(),
        maxResults: maxResults.toString()
      }
    })
  })

  test('should get the history for the given active-config | ESW-320', async () => {
    const configService = new ConfigService(() => '')
    const confPath = 'tmt/assembly.conf'
    const from = new Date(2020, 4)
    const to = new Date(2020, 5)
    const maxResults = 10
    const endpoint = `http://localhost:8080/history-active/${confPath}`

    const revision = {
      id: { id: '15265' },
      author: 'author1',
      comment: 'something',
      time: new Date()
    }
    postMockFn.mockResolvedValueOnce([configLocation])
    getMockFn.mockResolvedValueOnce([revision])

    const history = await configService.historyActive(confPath, from, to, maxResults)
    expect(history).toEqual([revision])
    expect(getMockFn).toBeCalledWith({
      endpoint,
      parameters: {
        from: from.toUTCString(),
        to: to.toUTCString(),
        maxResults: maxResults.toString()
      }
    })
  })

  test('should set the active version of the conf if config id and comment are given | ESW-320', async () => {
    const token = 'token123'
    const configService = new ConfigService(() => token)
    const confPath = 'tmt/assembly.conf'
    const endpoint = activeVersionEndpoint(confPath)
    const configId = { id: 'configId123' }
    const comment = 'something'

    postMockFn.mockResolvedValueOnce([configLocation])
    putMockFn.mockResolvedValueOnce({})

    await configService.setActiveVersion(confPath, configId, comment)
    expect(putMockFn).toBeCalledWith({
      endpoint,
      headers: new HeaderExt().withAuthorization(token),
      parameters: { id: configId.id, comment }
    })
  })

  test('should reset the active version of the conf if config id is not given | ESW-320', async () => {
    const token = 'token123'
    const configService = new ConfigService(() => token)
    const confPath = 'tmt/assembly.conf'
    const endpoint = activeVersionEndpoint(confPath)
    const comment = 'something'

    postMockFn.mockResolvedValueOnce([configLocation])
    putMockFn.mockResolvedValue({})

    await configService.resetActiveVersion(confPath, comment)

    expect(putMockFn).toBeCalledWith({
      endpoint,
      headers: new HeaderExt().withAuthorization(token),
      parameters: { comment }
    })
  })

  test('should delete the config | ESW-320', async () => {
    const token = 'token123'
    const configService = new ConfigService(() => token)
    const confPath = 'tmt/assembly.conf'
    const endpoint = configEndpoint(confPath)
    const comment = 'something'

    postMockFn.mockResolvedValueOnce([configLocation])
    deleteMockFn.mockResolvedValue({})

    await configService.delete(confPath, comment)

    expect(deleteMockFn).toBeCalledWith({
      endpoint,
      headers: new HeaderExt().withAuthorization(token),
      parameters: { comment }
    })
  })
})
