import { resolveGateway } from '../../../src/clients/gateway/resolveGateway'
import { mocked } from 'ts-jest/utils'
import { post } from '../../../src/utils/Post'

jest.mock('utils/post')
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
