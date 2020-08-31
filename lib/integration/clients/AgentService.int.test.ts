import 'whatwg-fetch'
import { AgentService, KillResponse, SpawnResponse } from '../../src/clients/agent-service'
import { HttpConnection } from '../../src/clients/location'
import { Prefix } from '../../src/models'
import { getToken } from '../utils/auth'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(80000)

let agentServiceWithValidToken: AgentService
let agentServiceWithInValidToken: AgentService
let agentServiceWithoutToken: AgentService

beforeAll(async () => {
  console.error = jest.fn()
  await startServices(['AAS', 'AgentService'])
  const validToken: string = await getToken('tmt-frontend-app', 'sm-user1', 'sm-user1', 'TMT')
  const inValidToken: string = await getToken(
    'tmt-frontend-app',
    'location-admin1',
    'location-admin1',
    'TMT'
  )
  agentServiceWithValidToken = await AgentService(() => validToken)
  agentServiceWithInValidToken = await AgentService(() => inValidToken)
  agentServiceWithoutToken = await AgentService(() => undefined)
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Agent Service client ', () => {
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
      HttpConnection(new Prefix('ESW', 'seq_comp1'), 'SequenceComponent')
    )

    expect(response._type).toStrictEqual('Killed')
  })

  test('should get forbidden when invalid token is passed | ESW-376', async () => {
    const connection = HttpConnection(new Prefix('ESW', 'seq_comp1'), 'SequenceComponent')
    expect.assertions(3)
    await agentServiceWithInValidToken.killComponent(connection).catch((e) => {
      expect(e.status).toBe(403)
      expect(e.message).toBe('Forbidden')
      expect(e.reason).toBe('The supplied authentication is not authorized to access this resource')
    })
  })

  test('should get unauthorised when no token is passed | ESW-376', async () => {
    const connection = HttpConnection(new Prefix('ESW', 'seq_comp1'), 'SequenceComponent')
    expect.assertions(3)
    await agentServiceWithoutToken.killComponent(connection).catch((e) => {
      expect(e.status).toBe(401)
      expect(e.message).toBe('Unauthorized')
      expect(e.reason).toBe(
        'The resource requires authentication, which was not supplied with the request'
      )
    })
  })
})
