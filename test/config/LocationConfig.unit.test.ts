import 'whatwg-fetch'
import { LocationConfig } from '../../src/config/LocationConfig'
describe('LocationConfig', () => {
  const mockedFetch = jest.spyOn(window, 'fetch')

  beforeEach(() => {
    jest.resetModules() //it clears the cache
  })

  test('should give production hostname and port when location config file is present | ESW-475, ESW-463', async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => JSON.stringify({ hostName: 'production-dns-entry.com', port: 8765 })
    } as Response)
    const config = await LocationConfig()
    expect(config.hostName).toEqual('production-dns-entry.com')
    expect(config.port).toEqual(8765)
  })

  test('should give local hostname and port when location config file is not present | ESW-475, ESW-463', async () => {
    const config = await LocationConfig()
    expect(config.hostName).toEqual('localhost')
    expect(config.port).toEqual(7654)
  })
})
