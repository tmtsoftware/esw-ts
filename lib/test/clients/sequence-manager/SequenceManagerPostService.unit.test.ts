import { mocked } from 'ts-jest/utils'
import {
  AgentProvisionConfig,
  ComponentId,
  ObsMode,
  Prefix,
  ProvisionConfig,
  Subsystem
} from '../../../src'
import * as Req from '../../../src/clients/sequence-manager/models/PostCommand'
import type * as T from '../../../src/clients/sequence-manager/models/SequenceManagerRes'
import { SequenceManagerImpl } from '../../../src/clients/sequence-manager/SequenceManagerImpl'
import * as Res from '../../../src/decoders/SequenceManagerDecoders'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const httpTransport = new HttpTransport('url', { tokenFactory: jest.fn() })
const mockHttpTransport = mocked(httpTransport)

const sequenceManager = new SequenceManagerImpl(httpTransport)

const obsMode = new ObsMode('darknight')
const subsystem: Subsystem = 'ESW'
const prefix: Prefix = new Prefix('ESW', 'sequencer1')
const masterSequencerComponentId = new ComponentId(prefix, 'Sequencer')

describe('Sequence manager', function () {
  test('should call configure | ESW-365', async () => {
    const obsMode = new ObsMode('darknight')

    const expectedConfigureResponse: T.ConfigureResponse = {
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
    const expectedProvisionRes: T.ProvisionResponse = { _type: 'Success' }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedProvisionRes)

    const response = await sequenceManager.provision(provisionConfig)

    expect(response).toEqual(expectedProvisionRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.Provision(provisionConfig),
      Res.ProvisionResponseD
    )
  })

  test('should call getObsModesDetails | ESW-469', async () => {
    const expectedRes: T.ObsModesDetailsResponse = {
      _type: 'Success',
      obsModes: []
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.getObsModesDetails()

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.GetObsModesDetails(),
      Res.ObsModesDetailsResponseD
    )
  })

  test('should call start sequencer | ESW-365', async () => {
    const expectedRes: T.StartSequencerResponse = {
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
    const expectedRes: T.RestartSequencerResponse = {
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
    const expectedRes: T.ShutdownSequencersResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownSequencer(subsystem, obsMode)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownSequencer(subsystem, obsMode),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  })

  test('should call shutdown sequencers by subsystem | ESW-365', async () => {
    const expectedRes: T.ShutdownSequencersResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownSubsystemSequencers(subsystem)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownSubsystemSequencers(subsystem),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  })

  test('should call shutdown sequencers by obsMode | ESW-365', async () => {
    const expectedRes: T.ShutdownSequencersResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownObsModeSequencers(obsMode)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownObsModeSequencers(obsMode),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  })

  test('should call shutdown all sequencers | ESW-365', async () => {
    const expectedRes: T.ShutdownSequencersResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownAllSequencers()

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownAllSequencers(),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  })

  test('should call shutdown a sequence component | ESW-365', async () => {
    const expectedRes: T.ShutdownSequenceComponentResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownSequenceComponent(prefix)

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownSequenceComponent(prefix),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  })

  test('should call shutdown all sequence components | ESW-365', async () => {
    const expectedRes: T.ShutdownSequenceComponentResponse = {
      _type: 'Success'
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)

    const response = await sequenceManager.shutdownAllSequenceComponents()

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.ShutdownAllSequenceComponents(),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  })

  test('should call get resources status | ESW-469', async () => {
    const expectedRes: T.ResourcesStatusResponse = {
      _type: 'Success',
      resourcesStatus: []
    }

    mockHttpTransport.requestRes.mockResolvedValueOnce(expectedRes)
    const response = await sequenceManager.getResources()

    expect(response).toEqual(expectedRes)
    verify(mockHttpTransport.requestRes).toBeCalledWith(
      new Req.GetResources(),
      Res.ResourcesStatusResponseD
    )
  })
})

afterEach(() => jest.resetAllMocks())
