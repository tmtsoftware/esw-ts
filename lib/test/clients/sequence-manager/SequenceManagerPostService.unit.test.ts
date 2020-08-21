import { mockHttpTransport } from '../../helpers/MockHelpers'
import { SequenceManagerImpl } from '../../../src/clients/sequence-manager/SequenceManagerImpl'
import { ObsMode } from '../../../src/clients/sequence-manager/models/ObsMode'
import { Configure, Provision } from '../../../src/clients/sequence-manager/models/PostCommand'
import {
  ConfigureResponseD,
  ProvisionResponseD
} from '../../../src/clients/sequence-manager/models/SequenceManagerRes'
import {
  AgentProvisionConfig,
  ProvisionConfig
} from '../../../src/clients/sequence-manager/models/ProvisionConfig'
import { Prefix } from '../../../src/models'

const requestRes: jest.Mock = jest.fn()
const sequenceManager = new SequenceManagerImpl(mockHttpTransport(requestRes))

describe('Sequence manager', function () {
  test('should call configure | ESW-365', async () => {
    const obsMode = new ObsMode('darknight')
    await sequenceManager.configure(obsMode)

    expect(requestRes).toBeCalledWith(new Configure(obsMode), ConfigureResponseD)
  })

  test('should call provision | ESW-365', async () => {
    const eswAgentPrefix = new Prefix('ESW', 'agent1')
    const agentProvisionConfig = new AgentProvisionConfig(eswAgentPrefix, 2)
    const provisionConfig = new ProvisionConfig([agentProvisionConfig])

    await sequenceManager.provision(provisionConfig)

    expect(requestRes).toBeCalledWith(new Provision(provisionConfig), ProvisionResponseD)
  })
})

afterEach(() => jest.resetAllMocks())
