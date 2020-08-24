import 'whatwg-fetch'
import { ObsMode } from '../../src/clients/sequence-manager/models/ObsMode'
import { SequenceManagerService } from '../../src/clients/sequence-manager/SequenceManagerService'
import { ComponentId, Prefix } from '../../src/models'
import { getToken } from '../utils/auth'
import {
  AgentProvisionConfig,
  ProvisionConfig
} from '../../src/clients/sequence-manager/models/ProvisionConfig'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(80000)
let sequenceManagerService: SequenceManagerService
beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await startServices(['AAS', 'SequenceManager'])
  const token = await getToken('tmt-frontend-app', 'sm-user1', 'sm-user1', 'TMT')
  sequenceManagerService = await SequenceManagerService(() => token)
})

const sequencerComponentId = new ComponentId(new Prefix('ESW', 'darknight'), 'Sequencer')
afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Sequence Manager Client ', () => {
  test('configure sequence components | ESW-365', async () => {
    const configureResponse = await sequenceManagerService.configure(new ObsMode('darknight'))

    expect(configureResponse).toEqual({
      _type: 'Success',
      masterSequencerComponentId: sequencerComponentId
    })
  })

  test('provision sequence components | ESW-365', async () => {
    const eswAgentPrefix = new Prefix('ESW', 'agent1')
    const agentProvisionConfig = new AgentProvisionConfig(eswAgentPrefix, 2)
    const provisionConfig = new ProvisionConfig([agentProvisionConfig])

    const provisionResponse = await sequenceManagerService.provision(provisionConfig)

    expect(provisionResponse).toEqual({
      _type: 'Success'
    })
  })
})
