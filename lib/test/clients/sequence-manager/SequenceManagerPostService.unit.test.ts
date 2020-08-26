import {
  AgentProvisionConfig,
  ObsMode,
  ProvisionConfig
} from '../../../src/clients/sequence-manager'
import * as Req from '../../../src/clients/sequence-manager/models/PostCommand'
import {
  AgentStatusResponseD,
  ConfigureResponseD,
  GetRunningObsModesResponseD,
  ProvisionResponseD,
  RestartSequencerResponseD,
  ShutdownSequencersAndSeqCompResponseD,
  StartSequencerResponseD
} from '../../../src/clients/sequence-manager/models/SequenceManagerRes'
import { SequenceManagerImpl } from '../../../src/clients/sequence-manager/SequenceManagerImpl'
import { Prefix, Subsystem } from '../../../src/models'
import { mockHttpTransport } from '../../helpers/MockHelpers'

const requestRes: jest.Mock = jest.fn()
const sequenceManager = new SequenceManagerImpl(mockHttpTransport(requestRes))
const obsMode = new ObsMode('darknight')
const subsystem: Subsystem = 'ESW'
const prefix: Prefix = new Prefix('ESW', 'sequencer1')

describe('Sequence manager', function () {
  test('should call configure | ESW-365', async () => {
    const obsMode = new ObsMode('darknight')
    await sequenceManager.configure(obsMode)

    expect(requestRes).toBeCalledWith(new Req.Configure(obsMode), ConfigureResponseD)
  })

  test('should call provision | ESW-365', async () => {
    const eswAgentPrefix = new Prefix('ESW', 'agent1')
    const agentProvisionConfig = new AgentProvisionConfig(eswAgentPrefix, 2)
    const provisionConfig = new ProvisionConfig([agentProvisionConfig])

    await sequenceManager.provision(provisionConfig)

    expect(requestRes).toBeCalledWith(new Req.Provision(provisionConfig), ProvisionResponseD)
  })

  test('should call getRunningObsMode | ESW-365', async () => {
    await sequenceManager.getRunningObsModes()

    expect(requestRes).toBeCalledWith(new Req.GetRunningObsModes(), GetRunningObsModesResponseD)
  })

  test('should call start sequencer | ESW-365', async () => {
    await sequenceManager.startSequencer(subsystem, obsMode)

    expect(requestRes).toBeCalledWith(
      new Req.StartSequencer(subsystem, obsMode),
      StartSequencerResponseD
    )
  })

  test('should call restart sequencer | ESW-365', async () => {
    await sequenceManager.restartSequencer(subsystem, obsMode)

    expect(requestRes).toBeCalledWith(
      new Req.RestartSequencer(subsystem, obsMode),
      RestartSequencerResponseD
    )
  })

  test('should call shutdown sequencer | ESW-365', async () => {
    await sequenceManager.shutdownSequencer(subsystem, obsMode)

    expect(requestRes).toBeCalledWith(
      new Req.ShutdownSequencer(subsystem, obsMode),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown sequencers by subsystem | ESW-365', async () => {
    await sequenceManager.shutdownSubsystemSequencers(subsystem)

    expect(requestRes).toBeCalledWith(
      new Req.ShutdownSubsystemSequencers(subsystem),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown sequencers by obsMode | ESW-365', async () => {
    await sequenceManager.shutdownObsModeSequencers(obsMode)

    expect(requestRes).toBeCalledWith(
      new Req.ShutdownObsModeSequencers(obsMode),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown all sequencers | ESW-365', async () => {
    await sequenceManager.shutdownAllSequencers()

    expect(requestRes).toBeCalledWith(
      new Req.ShutdownAllSequencers(),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown a sequence component | ESW-365', async () => {
    await sequenceManager.shutdownSequenceComponent(prefix)

    expect(requestRes).toBeCalledWith(
      new Req.ShutdownSequenceComponent(prefix),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown all sequence components | ESW-365', async () => {
    await sequenceManager.shutdownAllSequenceComponents()

    expect(requestRes).toBeCalledWith(
      new Req.ShutdownAllSequenceComponents(),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call get agent status | ESW-365', async () => {
    await sequenceManager.getAgentStatus()

    expect(requestRes).toBeCalledWith(new Req.GetAgentStatus(), AgentStatusResponseD)
  })
})

afterEach(() => jest.resetAllMocks())
