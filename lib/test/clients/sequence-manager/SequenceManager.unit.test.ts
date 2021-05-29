import { mocked } from 'ts-jest/utils'
import { SEQUENCE_MANAGER_CONNECTION } from '../../../src'
import { resolve } from '../../../src/clients/location/LocationUtils'
import { SequenceManagerService } from '../../../src/clients/sequence-manager'
import { SequenceManagerImpl } from '../../../src/clients/sequence-manager/SequenceManagerImpl'
import { HttpTransport } from '../../../src/utils/HttpTransport'

jest.mock('../../../src/clients/sequence-manager/SequenceManagerImpl')
jest.mock('../../../src/clients/location/LocationUtils')

const mockResolveSm = mocked(resolve)
const mockSMImpl = mocked(SequenceManagerImpl)

const tokenFactory = jest.fn()

describe('Sequence manager factory', () => {
  test('should create sequence manager service | ESW-365', async () => {
    const postEndpoint = 'postEndpoint'
    mockResolveSm.mockResolvedValue({
      _type: 'HttpLocation',
      uri: 'http://localhost:1234',
      metadata: {},
      connection: SEQUENCE_MANAGER_CONNECTION
    })
    const sequenceManagerImpl = new SequenceManagerImpl(
      new HttpTransport(postEndpoint, { tokenFactory })
    )
    mockSMImpl.mockReturnValue(sequenceManagerImpl)
    const response = await SequenceManagerService({ tokenFactory })

    expect(response).toEqual(sequenceManagerImpl)
    expect(mockResolveSm).toBeCalledTimes(1)
  })
})
