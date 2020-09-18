import { mocked } from 'ts-jest/utils'
import {
  AgentProvisionConfig,
  ObsMode,
  ProvisionConfig
} from '../../../src/clients/sequence-manager'
import * as Req from '../../../src/clients/sequence-manager/models/PostCommand'
import * as Res from '../../../src/clients/sequence-manager/models/SequenceManagerRes'
import { SequenceManagerImpl } from '../../../src/clients/sequence-manager/SequenceManagerImpl'
import { ComponentId, Prefix, Subsystem } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const httpTransport = new HttpTransport('url', () => undefined)
const mockHttpTransport = mocked(httpTransport)

const sequenceManager = new SequenceManagerImpl(httpTransport)

const obsMode = new ObsMode('darknight')
const subsystem: Subsystem = 'ESW'
const prefix: Prefix = new Prefix('ESW', 'sequencer1')
const masterSequencerComponentId = new ComponentId(prefix, 'Sequencer')

describe('Sequence manager', function () {
  test('should call configure | ESW-365', async () => {
    const obsMode = new ObsMode('darknight')

    const expectedConfigureResponse: Res.ConfigureResponse = {
      _type: 'Success',
      masterSequencerComponentId
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedConfigureResponse)

    const response = await sequenceManager.configure(obsMode)

    expect(response).toEqual(expectedConfigureResponse)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.Configure(obsMode),
      Res.ConfigureResponseD
    )
  })

  test('should call provision | ESW-365', async () => {
    const eswAgentPrefix = new Prefix('ESW', 'agent1')
    const agentProvisionConfig = new AgentProvisionConfig(eswAgentPrefix, 2)
    const provisionConfig = new ProvisionConfig([agentProvisionConfig])
    const expectedProvisionRes: Res.ProvisionResponse = { _type: 'Success' }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedProvisionRes)

    const response = await sequenceManager.provision(provisionConfig)

    expect(response).toEqual(expectedProvisionRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.Provision(provisionConfig),
      Res.ProvisionResponseD
    )
  })

  test('should call getRunningObsMode | ESW-365', async () => {
    const expectedRes: Res.GetRunningObsModesResponse = {
      _type: 'Success',
      runningObsModes: [new ObsMode('moonnight')]
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.getRunningObsModes()

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.GetRunningObsModes(),
      Res.GetRunningObsModesResponseD
    )
  })

  test('should call start sequencer | ESW-365', async () => {
    const expectedRes: Res.StartSequencerResponse = {
      _type: 'Started',
      componentId: masterSequencerComponentId
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.startSequencer(subsystem, obsMode)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.StartSequencer(subsystem, obsMode),
      Res.StartSequencerResponseD
    )
  })

  test('should call restart sequencer | ESW-365', async () => {
    const expectedRes: Res.RestartSequencerResponse = {
      _type: 'Success',
      componentId: masterSequencerComponentId
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.restartSequencer(subsystem, obsMode)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.RestartSequencer(subsystem, obsMode),
      Res.RestartSequencerResponseD
    )
  })

  test('should call shutdown sequencer | ESW-365', async () => {
    const expectedRes: Res.ShutdownSequencersResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownSequencer(subsystem, obsMode)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownSequencer(subsystem, obsMode),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown sequencers by subsystem | ESW-365', async () => {
    const expectedRes: Res.ShutdownSequencersResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownSubsystemSequencers(subsystem)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownSubsystemSequencers(subsystem),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown sequencers by obsMode | ESW-365', async () => {
    const expectedRes: Res.ShutdownSequencersResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownObsModeSequencers(obsMode)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownObsModeSequencers(obsMode),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown all sequencers | ESW-365', async () => {
    const expectedRes: Res.ShutdownSequencersResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownAllSequencers()

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownAllSequencers(),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown a sequence component | ESW-365', async () => {
    const expectedRes: Res.ShutdownSequenceComponentResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownSequenceComponent(prefix)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownSequenceComponent(prefix),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call shutdown all sequence components | ESW-365', async () => {
    const expectedRes: Res.ShutdownSequenceComponentResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownAllSequenceComponents()

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownAllSequenceComponents(),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  })

  test('should call get agent status | ESW-365', async () => {
    const expectedRes: Res.AgentStatusResponse = {
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

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.getAgentStatus()

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.GetAgentStatus(),
      Res.AgentStatusResponseD
    )
  })
})

afterEach(() => jest.resetAllMocks())
