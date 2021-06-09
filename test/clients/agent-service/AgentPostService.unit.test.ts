import { mocked } from 'ts-jest/utils'
import type { Killed, Spawned, AgentStatusResponse } from '../../../src'
import { ComponentId } from '../../../src'
import { AgentServiceImpl } from '../../../src/clients/agent-service/AgentServiceImpl'
import {
  AgentServiceRequest,
  GetAgentStatus,
  KillComponent,
  SpawnSequenceComponent,
  SpawnSequenceManager
} from '../../../src/clients/agent-service/models/PostCommand'
import {
  AgentStatusResponseD,
  KillResponseD,
  SpawnResponseD
} from '../../../src/decoders/AgentDecoders'
import { Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/HttpTransport')

const httpTransport: HttpTransport<AgentServiceRequest> = new HttpTransport('')
const agentService = new AgentServiceImpl(httpTransport)
const agentPrefix = new Prefix('ESW', 'agent1')
const componentName = 'Seqcomp_1'
const version = '1.0.0'

const mockedHttpTransport = mocked(httpTransport)

const expectedRes: Spawned = {
  _type: 'Spawned'
}

beforeEach(() => {
  mockedHttpTransport.requestRes.mockResolvedValue(expectedRes)
})

describe('Agent service', () => {
  test('should spawn sequence component of specific version | ESW-376', async () => {
    const response = await agentService.spawnSequenceComponent(agentPrefix, componentName, version)

    expect(response).toEqual(expectedRes)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new SpawnSequenceComponent(agentPrefix, componentName, [version]),
      SpawnResponseD
    )
  })

  test('should spawn sequence component with default version | ESW-376', async () => {
    const response = await agentService.spawnSequenceComponent(agentPrefix, componentName)

    expect(response).toEqual(expectedRes)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new SpawnSequenceComponent(agentPrefix, componentName, []),
      SpawnResponseD
    )
  })

  test('should spawn sequence manager of specific version | ESW-376', async () => {
    const response = await agentService.spawnSequenceManager(
      agentPrefix,
      '/path-to-config.conf',
      true,
      version
    )

    expect(response).toEqual(expectedRes)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new SpawnSequenceManager(agentPrefix, '/path-to-config.conf', true, [version]),
      SpawnResponseD
    )
  })

  test('should spawn sequence manager with default version | ESW-376', async () => {
    const response = await agentService.spawnSequenceManager(
      agentPrefix,
      '/path-to-config.conf',
      true
    )

    expect(response).toEqual(expectedRes)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new SpawnSequenceManager(agentPrefix, '/path-to-config.conf', true, []),
      SpawnResponseD
    )
  })

  test('should kill sequence component | ESW-376', async () => {
    const expectedResponse: Killed = {
      _type: 'Killed'
    }
    mockedHttpTransport.requestRes.mockResolvedValueOnce(expectedResponse)

    const response = await agentService.killComponent(
      new ComponentId(new Prefix('ESW', 'seq_comp1'), 'SequenceComponent')
    )

    expect(response).toEqual(expectedResponse)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new KillComponent(new ComponentId(new Prefix('ESW', 'seq_comp1'), 'SequenceComponent')),
      KillResponseD
    )
  })

  test('should call get agent status | ESW-365, ESW-481', async () => {
    const expectedRes: AgentStatusResponse = {
      _type: 'Success',
      agentStatus: [
        {
          agentId: new ComponentId(new Prefix('IRIS', 'Agent'), 'Machine'),
          seqCompsStatus: [
            {
              seqCompId: new ComponentId(new Prefix('IRIS', 'IRIS_123'), 'SequenceComponent'),
              sequencerLocation: []
            }
          ]
        }
      ],
      seqCompsWithoutAgent: [
        {
          seqCompId: new ComponentId(new Prefix('ESW', 'ESW_45'), 'SequenceComponent'),
          sequencerLocation: []
        }
      ]
    }

    mockedHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await agentService.getAgentStatus()

    expect(response).toEqual(expectedRes)
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new GetAgentStatus(),
      AgentStatusResponseD
    )
  })
})

afterEach(() => jest.resetAllMocks())
