import { mocked } from 'ts-jest/utils'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { getPostEndPoint } from '../../../src/utils/Utils'
import { AgentServiceImpl } from '../../../src/clients/agent-service/AgentServiceImpl'
import { AgentService } from '../../../src/clients/agent-service'
import { resolveAgentServer } from '../../../src/clients/agent-service/models/ResolveAgentServer'

jest.mock('../../../src/clients/agent-service/models/ResolveAgentServer')
jest.mock('../../../src/clients/agent-service/AgentServiceImpl')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const mockResolveAgent = mocked(resolveAgentServer)
const mockImpl = mocked(AgentServiceImpl)

describe('Agent Service Factory', () => {
  test('create agent service | ESW-314', async () => {
    const tokenFactory = jest.fn()
    const postEndpoint = 'postEndpoint'
    const uri = { host: '123', port: 1234 }
    const agentServiceImpl = new AgentServiceImpl(new HttpTransport(postEndpoint, tokenFactory))

    mockResolveAgent.mockResolvedValue(uri)
    postMockEndpoint.mockReturnValue(postEndpoint)
    mockImpl.mockReturnValue(agentServiceImpl)

    const response = await AgentService(tokenFactory)

    expect(response).toEqual(agentServiceImpl)
    expect(mockResolveAgent).toBeCalledTimes(1)
    expect(postMockEndpoint).toBeCalledWith(uri)
  })
})

afterAll(() => jest.resetAllMocks())
