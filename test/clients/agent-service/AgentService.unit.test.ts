import { mocked } from 'ts-jest/utils'
import { AGENT_SERVICE_CONNECTION, AuthData } from '../../../src'
import { AgentService } from '../../../src/clients/agent-service'
import { AgentServiceImpl } from '../../../src/clients/agent-service/AgentServiceImpl'
import { resolve } from '../../../src/clients/location/LocationUtils'
import { HttpTransport } from '../../../src/utils/HttpTransport'

jest.mock('../../../src/clients/location/LocationUtils')
jest.mock('../../../src/clients/agent-service/AgentServiceImpl')
const mockResolveAgent = mocked(resolve)
const mockImpl = mocked(AgentServiceImpl)

describe('Agent Service Factory', () => {
  test('create agent service | ESW-314', async () => {
    const authData: AuthData = {
      tokenFactory: jest.fn(),
      username: 'esw-ts'
    }
    const postEndpoint = 'postEndpoint'
    const agentServiceImpl = new AgentServiceImpl(new HttpTransport(postEndpoint, authData))
    mockImpl.mockReturnValue(agentServiceImpl)
    mockResolveAgent.mockResolvedValue({
      _type: 'HttpLocation',
      uri: 'http://localhost:1234',
      metadata: {},
      connection: AGENT_SERVICE_CONNECTION
    })

    const response = await AgentService(authData)

    expect(response).toEqual(agentServiceImpl)
    expect(mockResolveAgent).toBeCalledTimes(1)
  })
})

afterAll(() => jest.resetAllMocks())
