import { mocked } from 'ts-jest/utils'
import { AlarmService } from '../../../src/clients/alarm'
import { AlarmServiceImpl } from '../../../src/clients/alarm/AlarmServiceImpl'
import { resolveConnection } from '../../../src/config/Connections'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { getPostEndPoint } from '../../../src/utils/Utils'

jest.mock('../../../src/clients/alarm/AlarmServiceImpl')
jest.mock('../../../src/config/Connections')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const mockResolveGateway = mocked(resolveConnection)
const mockImpl = mocked(AlarmServiceImpl)

const postEndpoint = 'postEndpoint'
const uri = { host: '123', port: 1234 }
mockResolveGateway.mockResolvedValue(uri)
postMockEndpoint.mockReturnValue(postEndpoint)

const alarmServiceImpl = new AlarmServiceImpl(new HttpTransport(postEndpoint))

describe('Alarm Service Factory', () => {
  test('create alarm service | ESW-314', async () => {
    mockImpl.mockReturnValue(alarmServiceImpl)
    const a = await AlarmService()

    expect(a).toEqual(alarmServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
    expect(postMockEndpoint).toBeCalledWith(uri)
  })
})

afterAll(() => jest.resetAllMocks())
