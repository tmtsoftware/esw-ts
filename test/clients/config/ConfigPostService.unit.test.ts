import { mocked } from 'ts-jest/utils'
import type { Option } from '../../../src'
import { ConfigId } from '../../../src'
import { ConfigData, ConfigService } from '../../../src/clients/config-service'

import type { HttpLocation } from '../../../src/clients/location'
import { CONFIG_CONNECTION } from '../../../src/config/Connections'
import { ServiceError } from '../../../src/models'
import { HeaderExt } from '../../../src/utils/HeaderExt'
import { del, get, head, post, put } from '../../../src/utils/Http'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Http')
const getMockFn = mocked(get)
const postMockFn = mocked(post)
const headMockFn = mocked(head)
const putMockFn = mocked(put)
const deleteMockFn = mocked(del)

const uri = 'http://localhost:8080'
const configLocation: HttpLocation = {
  _type: 'HttpLocation',
  connection: CONFIG_CONNECTION,
  uri,
  metadata: {}
}

const token = 'validToken'
let configService: ConfigService

const configEndpoint = (path: string) => `http://localhost:8080/config/${path}`
const listEndpoint = () => `http://localhost:8080/list`
const activeConfigEndpoint = (path: string) => `http://localhost:8080/active-config/${path}`
const activeVersionEndpoint = (path: string) => `http://localhost:8080/active-version/${path}`
const blob = new Blob(['foo: bar'])
const configDataValue = ConfigData.from(blob)

beforeAll(async () => {
  postMockFn.mockResolvedValueOnce([configLocation])
  configService = await ConfigService(() => token)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('ConfigService', () => {
  test('should get the latest conf of given path from the config server | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = configEndpoint(confPath)

    getMockFn.mockResolvedValueOnce(blob)

    const confData: Option<ConfigData> = await configService.getLatest(confPath)
    expect(confData).toEqual(configDataValue)
    verify(getMockFn).toBeCalledWith({ url, responseMapper: expect.any(Function) })
  })

  test('should get the conf of given path and given id from the config server | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const configId = new ConfigId('configId123')
    const url = configEndpoint(`${confPath}?id=${configId.id}`)

    getMockFn.mockResolvedValueOnce(blob)

    const confData = await configService.getById(confPath, configId)
    expect(confData).toEqual(configDataValue)
    verify(getMockFn).toBeCalledWith({ url, responseMapper: expect.any(Function) })
  })

  test('should get undefined if config is not present for the given id | ESW-320, ESW-321', async () => {
    const confPath = 'tmt/assembly.conf'
    const configId = new ConfigId('configId123')
    const url = configEndpoint(`${confPath}?id=${configId.id}`)

    getMockFn.mockRejectedValueOnce(new ServiceError('TransportError', '', 404, 'Not Found'))

    const confData = await configService.getById(confPath, configId)
    expect(confData).toBeUndefined()
    verify(getMockFn).toBeCalledWith({ url, responseMapper: expect.any(Function) })
  })

  test('should throw generic error if bad request is received on getById | ESW-320, ESW-321', async () => {
    const confPath = 'tmt/assembly.conf'
    const configId = new ConfigId('configId123')

    getMockFn.mockRejectedValueOnce(
      new ServiceError('ArithmeticException', '/ by 0', 500, 'Internal server error')
    )

    expect.assertions(4)
    await configService.getById(confPath, configId).catch((e) => {
      expect(e.errorType).toBe('ArithmeticException')
      expect(e.message).toBe('/ by 0')
      expect(e.status).toBe(500)
      expect(e.statusText).toBe('Internal server error')
    })
  })

  test('should get the conf of given path and given time from the config server | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const date = new Date()
    const url = configEndpoint(`${confPath}?date=${date.toISOString()}`)

    getMockFn.mockResolvedValueOnce(blob)

    const confData = await configService.getByTime(confPath, date)
    expect(confData).toEqual(configDataValue)
    verify(getMockFn).toBeCalledWith({ url, responseMapper: expect.any(Function) })
  })

  test('should check if the given conf is present | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = configEndpoint(confPath)

    headMockFn.mockResolvedValueOnce(true)

    const actualRes = await configService.exists(confPath)
    expect(actualRes).toBe(true)
    expect(headMockFn).toHaveBeenCalledWith({ url, decoder: expect.anything() })
  })

  test('should check if the given conf with given id is present | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const configId = new ConfigId('configId123')
    const url = configEndpoint(`${confPath}?id=${configId.id}`)

    headMockFn.mockResolvedValueOnce(true)

    const actualRes = await configService.exists(confPath, configId)
    expect(actualRes).toBe(true)
    verify(headMockFn).toBeCalledWith({ url, decoder: expect.anything() })
  })

  test('should return false if the given conf is not present | ESW-320, ESW-321', async () => {
    const confPath = 'tmt/assembly.conf'
    const configId = new ConfigId('configId123')
    const url = configEndpoint(`${confPath}?id=${configId.id}`)

    headMockFn.mockRejectedValueOnce(new ServiceError('TransportError', '', 404, 'Not Found'))

    const actualRes = await configService.exists(confPath, configId)
    expect(actualRes).toBe(false)
    verify(headMockFn).toBeCalledWith({ url, decoder: expect.anything() })
  })

  test('should throw error if internal server error is received on check of config exists| ESW-320, ESW-321', async () => {
    const confPath = 'tmt/assembly.conf'
    const configId = new ConfigId('configId123')

    headMockFn.mockRejectedValueOnce(
      new ServiceError('ArithmeticException', '/ by 0', 500, 'Internal server error')
    )

    expect.assertions(4)
    await configService.exists(confPath, configId).catch((e) => {
      expect(e.errorType).toBe('ArithmeticException')
      expect(e.message).toBe('/ by 0')
      expect(e.status).toBe(500)
      expect(e.statusText).toBe('Internal server error')
    })
  })

  test('should list all the config if there is not type(fileType) or pattern defined | ESW-320, ESW-410', async () => {
    const url = listEndpoint()

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

    getMockFn.mockResolvedValueOnce([firstConfInfo, secondConfInfo])

    const actualRes = await configService.list()
    expect(actualRes).toEqual([firstConfInfo, secondConfInfo])
    verify(getMockFn).toBeCalledWith({ url, queryParams: {}, decoder: expect.any(Function) })
  })

  test('should list all the config based on the given pattern | ESW-320, ESW-410', async () => {
    const url = listEndpoint()

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

    getMockFn.mockResolvedValueOnce([firstConfInfo, secondConfInfo])

    const actualRes = await configService.list({ pattern: '.*' })
    expect(actualRes).toEqual([firstConfInfo, secondConfInfo])
    verify(getMockFn).toBeCalledWith({
      url,
      queryParams: { pattern: '.*' },
      decoder: expect.any(Function)
    })
  })

  test('should list all the config for the given fileType | ESW-320, ESW-410', async () => {
    const url = listEndpoint()

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

    getMockFn.mockResolvedValueOnce([firstConfInfo, secondConfInfo])

    const actualRes = await configService.list({ type: 'Annex' })
    expect(actualRes).toEqual([firstConfInfo, secondConfInfo])
    verify(getMockFn).toBeCalledWith({
      url,
      queryParams: { type: 'Annex' },
      decoder: expect.any(Function)
    })
  })

  test('should list all the config for given type(fileType) and pattern both | ESW-320, ESW-410', async () => {
    const url = listEndpoint()

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

    getMockFn.mockResolvedValueOnce([firstConfInfo, secondConfInfo])

    const actualRes = await configService.list({ type: 'Annex', pattern: '.*' })
    expect(actualRes).toEqual([firstConfInfo, secondConfInfo])
    verify(getMockFn).toBeCalledWith({
      url,
      queryParams: { type: 'Annex', pattern: '.*' },
      decoder: expect.any(Function)
    })
  })

  test('should get the active conf of given path from the config server | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = activeConfigEndpoint(`${confPath}`)

    getMockFn.mockResolvedValueOnce(blob)

    const confData = await configService.getActive(confPath)
    expect(confData).toEqual(configDataValue)
    verify(getMockFn).toBeCalledWith({ url, responseMapper: expect.any(Function) })
  })

  test('should get the active conf of given path and given time from the config server | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const date = new Date()
    const url = activeConfigEndpoint(`${confPath}?date=${date.toISOString()}`)

    getMockFn.mockResolvedValueOnce(blob)

    const confData = await configService.getActiveByTime(confPath, date)
    expect(confData).toEqual(configDataValue)
    verify(getMockFn).toBeCalledWith({ url, responseMapper: expect.any(Function) })
  })

  test('should get the active version of the conf | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = activeVersionEndpoint(confPath)
    const configId = { id: 'configId123' }

    getMockFn.mockResolvedValueOnce(configId)

    const actualConfId = await configService.getActiveVersion(confPath)
    expect(actualConfId).toEqual(configId)
    verify(getMockFn).toBeCalledWith({ url, decoder: expect.any(Function) })
  })

  test('should get undefined if the active version not found for the config | ESW-320, ESW-321', async () => {
    const confPath = 'tmt/assembly.conf'

    getMockFn.mockRejectedValueOnce(new ServiceError('TransportError', '', 404, 'Not Found'))

    const configId = await configService.getActiveVersion(confPath)
    expect(configId).toBeUndefined()
  })

  test('should throw error if internal server error is received on getActiveVersion | ESW-320, ESW-321', async () => {
    const confPath = 'tmt/assembly.conf'

    getMockFn.mockRejectedValueOnce(
      new ServiceError('ArithmeticException', '/ by 0', 500, 'Internal server error')
    )

    expect.assertions(4)
    await configService.getActiveVersion(confPath).catch((e) => {
      expect(e.errorType).toBe('ArithmeticException')
      expect(e.message).toBe('/ by 0')
      expect(e.status).toBe(500)
      expect(e.statusText).toBe('Internal server error')
    })
  })

  test('should get metadata | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = 'http://localhost:8080/metadata'

    const expectedConfigMetadata = {
      repoPath: confPath,
      annexPath: confPath,
      annexMinFileSize: '1MB',
      maxConfigFileSize: '1MB'
    }

    getMockFn.mockResolvedValueOnce(expectedConfigMetadata)

    const configMetadata = await configService.getMetadata()
    expect(configMetadata).toEqual(expectedConfigMetadata)
    verify(getMockFn).toBeCalledWith({ url, decoder: expect.any(Function) })
  })

  test('should get the history for the given config path | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const from = new Date(2020, 4)
    const to = new Date(2020, 5)
    const maxResults = 10
    const url = `http://localhost:8080/history/${confPath}`

    const revision = {
      id: { id: '15265' },
      author: 'author1',
      comment: 'something',
      time: new Date()
    }

    getMockFn.mockResolvedValueOnce([revision])

    const history = await configService.history(confPath, from, to, maxResults)
    expect(history).toEqual([revision])
    verify(getMockFn).toBeCalledWith({
      url,
      queryParams: {
        from: from.toISOString(),
        to: to.toISOString(),
        maxResults: maxResults.toString()
      },
      decoder: expect.any(Function)
    })
  })

  test('should get the history for the given active-config | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const from = new Date(2020, 4)
    const to = new Date(2020, 5)
    const maxResults = 10
    const url = `http://localhost:8080/history-active/${confPath}`

    const revision = {
      id: { id: '15265' },
      author: 'author1',
      comment: 'something',
      time: new Date()
    }

    getMockFn.mockResolvedValueOnce([revision])

    const history = await configService.historyActive(confPath, from, to, maxResults)
    expect(history).toEqual([revision])
    verify(getMockFn).toBeCalledWith({
      url,
      queryParams: {
        from: from.toISOString(),
        to: to.toISOString(),
        maxResults: maxResults.toString()
      },
      decoder: expect.anything()
    })
  })

  test('should set the active version of the conf if config id and comment are given | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = activeVersionEndpoint(confPath)
    const configId = new ConfigId('configId123')
    const comment = 'something'

    putMockFn.mockResolvedValueOnce({})

    await configService.setActiveVersion(confPath, configId, comment)
    verify(putMockFn).toBeCalledWith({
      url,
      headers: new HeaderExt().withAuthorization(token),
      queryParams: { id: configId.id, comment }
    })
  })

  test('should reset the active version of the conf if config id is not given | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = activeVersionEndpoint(confPath)
    const comment = 'something'

    putMockFn.mockResolvedValue({})

    await configService.resetActiveVersion(confPath, comment)
    verify(putMockFn).toBeCalledWith({
      url,
      headers: new HeaderExt().withAuthorization(token),
      queryParams: { comment }
    })
  })

  test('should delete the config | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = configEndpoint(confPath)
    const comment = 'something'

    deleteMockFn.mockResolvedValue({})

    await configService.delete(confPath, comment)

    verify(deleteMockFn).toBeCalledWith({
      url,
      headers: new HeaderExt().withAuthorization(token),
      queryParams: { comment }
    })
  })

  test('should create the config | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = configEndpoint(confPath)
    const comment = 'something'
    const configId = { id: 'configId123' }
    const file: File = new File(['foo: Bar'], 'assembly.conf')

    postMockFn.mockResolvedValueOnce(configId)

    const configData = ConfigData.fromFile(file)
    const actualResConfigId = await configService.create(confPath, configData, true, comment)

    expect(actualResConfigId).toEqual(configId)
    expect(postMockFn).toHaveBeenCalledWith({
      url,
      headers: new HeaderExt().withAuthorization(token).withContentType('application/octet-stream'),
      queryParams: { annex: 'true', comment },
      payload: new Blob([file]),
      decoder: expect.anything()
    })
  })

  test('should update the config | ESW-320', async () => {
    const confPath = 'tmt/assembly.conf'
    const url = configEndpoint(confPath)
    const comment = 'something'
    const configId = { id: 'configId123' }
    const file: File = new File(['foo: Bar'], 'assembly.conf')

    putMockFn.mockResolvedValueOnce(configId)

    const configData = ConfigData.fromFile(file)
    const actualResConfigId = await configService.update(confPath, configData, comment)

    expect(actualResConfigId).toEqual(configId)
    verify(putMockFn).toBeCalledWith({
      url,
      headers: new HeaderExt().withAuthorization(token).withContentType('application/octet-stream'),
      queryParams: { comment },
      payload: new Blob([file]),
      decoder: expect.any(Function)
    })
  })

  test('should throw error while creating config with invalid path | ESW-410', async () => {
    const confPath = 'tmt/assem~bly.conf'
    const comment = 'something'
    const file: File = new File(['foo: Bar'], 'assembly.conf')

    const configData = ConfigData.fromFile(file)
    expect.assertions(1)
    expect(() => configService.create(confPath, configData, true, comment)).toThrow(
      "Input file path 'tmt/assem~bly.conf' contains invalid characters. Note, these characters !#<>$%&'@^`~+,;= or 'white space' are not allowed in file path"
    )
  })

  test('should throw error while updating config with invalid path | ESW-410', async () => {
    const confPath = 'tmt/assem bly.conf'
    const comment = 'something'
    const file: File = new File(['foo: Bar'], 'assembly.conf')

    const configData = ConfigData.fromFile(file)
    expect.assertions(1)
    expect(() => configService.update(confPath, configData, comment)).toThrow(
      "Input file path 'tmt/assem bly.conf' contains invalid characters. Note, these characters !#<>$%&'@^`~+,;= or 'white space' are not allowed in file path"
    )
  })
})
