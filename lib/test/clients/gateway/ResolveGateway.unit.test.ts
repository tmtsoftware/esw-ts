import { mocked } from 'ts-jest/utils'
import { resolveGateway } from '../../../src/clients/gateway/ResolveGateway'
import { post } from '../../../src/utils/Http'

jest.mock('../../../src/utils/Http')
const postMockFn = mocked(post, true)

afterEach(() => {
  jest.clearAllMocks()
})

describe('Gateway util', () => {
  test('should resolve location of gateway', async () => {
    postMockFn.mockResolvedValueOnce([])
    await expect(resolveGateway()).rejects.toThrow(Error)
  })
})
