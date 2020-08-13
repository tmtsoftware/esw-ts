import { mocked } from 'ts-jest/utils'
import { getPostEndPoint } from '../../../src/utils/Utils'
import { resolveGateway } from '../../../src/clients/gateway/ResolveGateway'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { AlarmService } from '../../../src/clients/alarm'
import { AlarmServiceImpl } from '../../../src/clients/alarm/Impl'

jest.mock('../../../src/clients/alarm/Impl')
jest.mock('../../../src/clients/gateway/ResolveGateway')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const mockResolveGateway = mocked(resolveGateway)
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
