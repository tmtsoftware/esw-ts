import { Prefix } from '../../../src/models'
import { AgentServiceImpl } from '../../../src/clients/agent-service/AgentServiceImpl'
import { mockHttpTransport } from '../../helpers/MockHelpers'
import { HttpConnection } from '../../../src/clients/location'

const mockResponse = Math.random().toString()
const requestRes: jest.Mock = jest.fn().mockReturnValue(Promise.resolve(mockResponse))
const agentService = new AgentServiceImpl(mockHttpTransport(requestRes))
const agentPrefix = new Prefix('ESW', 'agent1')
describe('Agent service', () => {
  test('should spawn sequence component of specific version | ESW-376', async () => {
    const response = await agentService.spawnSequenceComponent(agentPrefix, 'Seqcomp_1', '1.0.0')

    expect(response).toEqual(mockResponse)
  })

  test('should spawn sequence component with default version | ESW-376', async () => {
    const response = await agentService.spawnSequenceComponent(agentPrefix, 'Seqcomp_1')

    expect(response).toEqual(mockResponse)
  })

  test('should spawn sequence manager of specific version | ESW-376', async () => {
    const response = await agentService.spawnSequenceManager(
      agentPrefix,
      '/path-to-config.conf',
      true,
      '1.0.0'
    )

    expect(response).toEqual(mockResponse)
  })

  test('should spawn sequence manager with default version | ESW-376', async () => {
    const response = await agentService.spawnSequenceManager(
      agentPrefix,
      '/path-to-config.conf',
      true
    )

    expect(response).toEqual(mockResponse)
  })

  test('should kill sequence component | ESW-376', async () => {
    const response = await agentService.killComponent(
      HttpConnection(new Prefix('ESW', 'seq_comp1'), 'SequenceComponent')
    )

    expect(response).toEqual(mockResponse)
  })
})
