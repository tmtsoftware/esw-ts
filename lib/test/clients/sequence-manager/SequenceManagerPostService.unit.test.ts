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

const mockResponse = Math.random().toString()
const requestRes: jest.Mock = jest.fn().mockReturnValue(Promise.resolve(mockResponse))
const sequenceManager = new SequenceManagerImpl(mockHttpTransport(requestRes))
const obsMode = new ObsMode('darknight')
const subsystem: Subsystem = 'ESW'
const prefix: Prefix = new Prefix('ESW', 'sequencer1')

describe('Sequence manager', function () {
  test('should call configure | ESW-365', async () => {
    const obsMode = new ObsMode('darknight')

    const response = await sequenceManager.configure(obsMode)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new Req.Configure(obsMode), ConfigureResponseD)
  })

  test('should call provision | ESW-365', async () => {
    const eswAgentPrefix = new Prefix('ESW', 'agent1')
    const agentProvisionConfig = new AgentProvisionConfig(eswAgentPrefix, 2)
    const provisionConfig = new ProvisionConfig([agentProvisionConfig])

    const response = await sequenceManager.provision(provisionConfig)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new Req.Provision(provisionConfig), ProvisionResponseD)
  })

  test('should call getRunningObsMode | ESW-365', async () => {
    const response = await sequenceManager.getRunningObsModes()

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new Req.GetRunningObsModes(), GetRunningObsModesResponseD)
  })

  test('should call start sequencer | ESW-365', async () => {
    const response = await sequenceManager.startSequencer(subsystem, obsMode)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Req.StartSequencer(subsystem, obsMode),
      StartSequencerResponseD
    )
  })

  test('should call restart sequencer | ESW-365', async () => {
    const response = await sequenceManager.restartSequencer(subsystem, obsMode)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Req.RestartSequencer(subsystem, obsMode),
      RestartSequencerResponseD
    )
  })

  test('should call shutdown sequencer | ESW-365', async () => {
    const response = await sequenceManager.shutdownSequencer(subsystem, obsMode)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Req.ShutdownSequencer(subsystem, obsMode),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown sequencers by subsystem | ESW-365', async () => {
    const response = await sequenceManager.shutdownSubsystemSequencers(subsystem)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Req.ShutdownSubsystemSequencers(subsystem),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown sequencers by obsMode | ESW-365', async () => {
    const response = await sequenceManager.shutdownObsModeSequencers(obsMode)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Req.ShutdownObsModeSequencers(obsMode),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown all sequencers | ESW-365', async () => {
    const response = await sequenceManager.shutdownAllSequencers()

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Req.ShutdownAllSequencers(),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown a sequence component | ESW-365', async () => {
    const response = await sequenceManager.shutdownSequenceComponent(prefix)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Req.ShutdownSequenceComponent(prefix),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown all sequence components | ESW-365', async () => {
    const response = await sequenceManager.shutdownAllSequenceComponents()

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(
      new Req.ShutdownAllSequenceComponents(),
      ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call get agent status | ESW-365', async () => {
    const response = await sequenceManager.getAgentStatus()

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new Req.GetAgentStatus(), AgentStatusResponseD)
  })
})

afterAll(() => jest.resetAllMocks())
