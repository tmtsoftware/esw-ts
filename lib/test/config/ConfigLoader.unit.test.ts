import { mocked } from 'ts-jest/utils'
import { load } from '../../src/config/ConfigLoader'
import { dynamicImport } from '../../src/utils/DynamicLoader'

jest.mock('../../src/utils/DynamicLoader')
const mockLoader = mocked(dynamicImport)

describe('Config Loader', () => {
  test('should be able to decode application name from config', async () => {
    mockLoader.mockResolvedValueOnce({ AppConfig: { applicationName: 'test-app' } })
    const expected = { applicationName: 'test-app' }

    const config = await load()
    expect(config).toEqual(expected)
  })

  test('should return unknown when application name does not exist', async () => {
    mockLoader.mockResolvedValueOnce({ AppConfig: {} })

    const expected = { applicationName: 'unknown' }

    const config = await load()
    expect(config).toEqual(expected)
  })

  test('should return unknown when AppConfig does not exist', async () => {
    mockLoader.mockResolvedValueOnce({})

    const expected = { applicationName: 'unknown' }

    const config = await load()
    expect(config).toEqual(expected)
  })

  test('should return unknown when module does not exist', async () => {
    mockLoader.mockRejectedValueOnce(Error('File not found'))

    const expected = { applicationName: 'unknown' }

    const config = await load()
    expect(config).toEqual(expected)
  })
})
