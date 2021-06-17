import { mocked } from 'ts-jest/utils'
import 'whatwg-fetch'
import { loadConfig } from '../../src/config/GlobalConfig'
import { LocationConfig } from '../../src/config/LocationConfig'
jest.mock('../../src/config/GlobalConfig')

describe('LocationConfig', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() //it clears the cache
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  test('should give production hostname and port when NODE_ENV is set to production | ESW-475', async () => {
    process.env.NODE_ENV = 'production'
    const mockLoadConfig = mocked(loadConfig)
    mockLoadConfig.mockResolvedValue({
      locationUrl: 'https://production-dns-entry.com:8765'
    })
    const config = await LocationConfig()

    expect(config.host).toEqual('production-dns-entry.com')
    expect(config.port).toEqual(8765)
  })

  test('should give local hostname and port when NODE_ENV is not set to production | ESW-475', async () => {
    process.env.NODE_ENV = 'dev'
    const config = await LocationConfig()

    expect(config.host).toEqual('localhost')
    expect(config.port).toEqual(7654)
  })
})
