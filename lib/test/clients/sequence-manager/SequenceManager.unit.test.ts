import { mocked } from 'ts-jest/utils'
import { getPostEndPoint } from '../../../src/utils/Utils'
import { SequenceManagerImpl } from '../../../src/clients/sequence-manager/SequenceManagerImpl'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { SequenceManagerService } from '../../../src/clients/sequence-manager/SequenceManagerService'
import { resolveSequenceManager } from '../../../src/clients/sequence-manager/ResolveSequenceManager'

jest.mock('../../../src/clients/sequence-manager/SequenceManagerImpl')
jest.mock('../../../src/clients/sequence-manager/ResolveSequenceManager')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const mockResolveSm = mocked(resolveSequenceManager)
const mockImpl = mocked(SequenceManagerImpl)

const tokenFactory = () => undefined

describe('Sequence manager factory', () => {
  test('should create sequence manager service | ESW-365', async () => {
    const postEndpoint = 'postEndpoint'
    const uri = { host: '123', port: 1234 }
    mockResolveSm.mockResolvedValue(uri)
    postMockEndpoint.mockReturnValueOnce(postEndpoint)
    const sequenceManagerImpl = new SequenceManagerImpl(new HttpTransport(postEndpoint, tokenFactory))
    mockImpl.mockReturnValue(sequenceManagerImpl)

    const response = await SequenceManagerService(tokenFactory)

    expect(response).toEqual(sequenceManagerImpl)
    expect(mockResolveSm).toBeCalledTimes(1)
    expect(postMockEndpoint).toBeCalledWith(uri)
  })
})
