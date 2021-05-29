import 'whatwg-fetch'
import {
  AgentService,
  AkkaConnection,
  ComponentId,
  KillResponse,
  Prefix,
  setAppConfigPath,
  SpawnResponse
} from '../../src'
import { APP_CONFIG_PATH } from '../../src/config/AppConfigPath'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(80000)

let agentServiceWithValidToken: AgentService
let agentServiceWithInValidToken: AgentService
let agentServiceWithoutToken: AgentService

const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

beforeAll(async () => {
  console.error = jest.fn()
  setAppConfigPath('../../test/assets/appconfig/AppConfig.ts')
  await startServices(['AgentService'])
  const validToken = 'validToken'
  const inValidToken = 'tokenWithoutRole'
  agentServiceWithValidToken = await AgentService({ tokenFactory: () => validToken })
  agentServiceWithInValidToken = await AgentService({ tokenFactory: () => inValidToken })
  agentServiceWithoutToken = await AgentService()
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
  setAppConfigPath(OLD_APP_CONFIG_PATH)
})

describe('Agent Service client', () => {
  test('spawn sequence component | ESW-376', async () => {
    const agentPrefix = new Prefix('ESW', 'esw_machine')

    const response: SpawnResponse = await agentServiceWithValidToken.spawnSequenceComponent(
      agentPrefix,
      'sequence_comp1',
      '0.1.0-SNAPSHOT'
    )

    expect(response._type).toStrictEqual('Spawned')
  })

  test('spawn sequence manager | ESW-376', async () => {
    const agentPrefix = new Prefix('ESW', 'esw_machine')

    const response: SpawnResponse = await agentServiceWithValidToken.spawnSequenceManager(
      agentPrefix,
      '/obs-mode.conf',
      true,
      '0.1.0-SNAPSHOT'
    )

    expect(response._type).toStrictEqual('Spawned')
  })

  test('kill component | ESW-376', async () => {
    const response: KillResponse = await agentServiceWithValidToken.killComponent(
      new ComponentId(new Prefix('ESW', 'seq_comp1'), 'SequenceComponent')
    )

    expect(response._type).toStrictEqual('Killed')
  })

  test('should get forbidden when invalid token is passed | ESW-376', async () => {
    const componentId = new ComponentId(new Prefix('ESW', 'seq_comp1'), 'SequenceComponent')
    expect.assertions(4)
    await agentServiceWithInValidToken.killComponent(componentId).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.status).toBe(403)
      expect(e.statusText).toBe('Forbidden')
      expect(e.message).toBe(
        'The supplied authentication is not authorized to access this resource'
      )
    })
  })

  test('should get unauthorised when no token is passed | ESW-376', async () => {
    const componentId = new ComponentId(new Prefix('ESW', 'seq_comp1'), 'SequenceComponent')
    expect.assertions(4)
    await agentServiceWithoutToken.killComponent(componentId).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.status).toBe(401)
      expect(e.statusText).toBe('Unauthorized')
      expect(e.message).toBe(
        'The resource requires authentication, which was not supplied with the request'
      )
    })
  })

  test('getAgentStatus | ESW-365, ESW-481', async () => {
    const response = await agentServiceWithoutToken.getAgentStatus()

    expect(response).toEqual({
      _type: 'Success',
      agentStatus: [
        {
          agentId: new ComponentId(new Prefix('ESW', 'agent1'), 'Machine'),
          seqCompsStatus: [
            {
              seqCompId: new ComponentId(new Prefix('ESW', 'seqcomp1'), 'SequenceComponent'),
              sequencerLocation: [
                {
                  _type: 'AkkaLocation',
                  connection: AkkaConnection(Prefix.fromString('ESW.IRIS_DARKNIGHT'), 'Sequencer'),
                  metadata: {
                    sequenceComponentPrefix: 'ESW.seqcomp1'
                  },
                  uri: ''
                }
              ]
            }
          ]
        }
      ],
      seqCompsWithoutAgent: []
    })
  })
})
