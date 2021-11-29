import 'whatwg-fetch'
import { AgentProvisionConfig, ComponentId, ObsMode, Prefix, ProvisionConfig, SequenceManagerService } from '../../src'
import { setAppName } from '../../src/config/AppName'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(80000)

let sequenceManagerServiceWithValidToken: SequenceManagerService
let sequenceManagerServiceWithInValidToken: SequenceManagerService
let sequenceManagerServiceWithoutToken: SequenceManagerService

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  setAppName('test-app')
  await startServices(['SequenceManager'])
  // Authorized user for Sequence Manager APIs
  const token = 'validToken'

  // this user is authenticated but not authorized for sequence Manager APIs
  const invalidToken = 'tokenWithoutRole'

  sequenceManagerServiceWithValidToken = await SequenceManagerService({ tokenFactory: () => token })
  sequenceManagerServiceWithInValidToken = await SequenceManagerService({
    tokenFactory: () => invalidToken
  })
  sequenceManagerServiceWithoutToken = await SequenceManagerService()
})

const sequencerComponentId = new ComponentId(new Prefix('ESW', 'darknight'), 'Sequencer')
afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

// The tests below use a stubbed out implementation of the SM
// in the esw-backend-testkit, in esw, specified in SequenceManagerStubImpl
describe('Sequence Manager Client', () => {
  test('configure sequence components | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.configure(new ObsMode('darknight'))

    expect(response).toEqual({
      _type: 'Success',
      masterSequencerComponentId: sequencerComponentId
    })
  })

  test('provision sequence components | ESW-365', async () => {
    const eswAgentPrefix = new Prefix('ESW', 'agent1')
    const agentProvisionConfig = new AgentProvisionConfig(eswAgentPrefix, 2)
    const provisionConfig = new ProvisionConfig([agentProvisionConfig])

    const response = await sequenceManagerServiceWithValidToken.provision(provisionConfig)

    expect(response).toEqual({
      _type: 'Success'
    })
  })

  test('getObsModeDetails | ESW-469', async () => {
    const response = await sequenceManagerServiceWithValidToken.getObsModesDetails()
    expect(response).toEqual({
      _type: 'Success',
      obsModes: [
        {
          obsMode: new ObsMode('DarkNight_1'),
          resources: ['ESW', 'IRIS'],
          sequencers: [Prefix.fromString('ESW.DarkNight_1'), Prefix.fromString('TCS.DarkNight_1')],
          status: {
            _type: 'Configured'
          }
        },
        {
          obsMode: new ObsMode('DarkNight_2'),
          resources: ['IRIS', 'TCS'],
          sequencers: [Prefix.fromString('ESW.DarkNight_2'), Prefix.fromString('IRIS.DarkNight_2.IRIS_IMAGER')],
          status: {
            _type: 'Configurable'
          }
        },
        {
          obsMode: new ObsMode('DarkNight_3'),
          resources: ['TCS'],
          sequencers: [Prefix.fromString('TCS.DarkNight_3')],
          status: {
            _type: 'NonConfigurable',
            missingSequenceComponents: [new Prefix('TCS', 'DarkNight_3')]
          }
        }
      ]
    })
  })

  test('startSequencer | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.startSequencer(Prefix.fromString('ESW.darknight'))

    expect(response).toEqual({
      _type: 'Started',
      componentId: new ComponentId(new Prefix('ESW', 'darknight'), 'Sequencer')
    })
  })

  test('restartSequencer | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.restartSequencer(Prefix.fromString('ESW.darknight'))

    expect(response).toEqual({
      _type: 'Success',
      componentId: new ComponentId(new Prefix('ESW', 'darknight'), 'Sequencer')
    })
  })

  test('shutdownSequencer | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.shutdownSequencer(Prefix.fromString('ESW.darknight'))

    expect(response).toEqual({
      _type: 'Success'
    })
  })

  test('shutdownSubsystemSequencers | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.shutdownSubsystemSequencers('ESW')

    expect(response).toEqual({
      _type: 'Success'
    })
  })

  test('shutdownObsModeSequencers | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.shutdownObsModeSequencers(new ObsMode('darknight'))

    expect(response).toEqual({
      _type: 'Success'
    })
  })

  test('shutdownAllSequencers | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.shutdownAllSequencers()

    expect(response).toEqual({
      _type: 'Success'
    })
  })

  test('shutdownSequenceComponent | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.shutdownSequenceComponent(new Prefix('ESW', 'primary'))

    expect(response).toEqual({
      _type: 'Success'
    })
  })

  test('shutdownAllSequenceComponents | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.shutdownAllSequenceComponents()

    expect(response).toEqual({
      _type: 'Success'
    })
  })

  test('getResources | ESW-469', async () => {
    const response = await sequenceManagerServiceWithValidToken.getResources()

    expect(response).toEqual({
      _type: 'Success',
      resourcesStatus: [
        {
          obsMode: {
            name: 'darknight'
          },
          resource: 'ESW',
          status: {
            _type: 'InUse'
          }
        },
        {
          obsMode: {
            name: 'darknight'
          },
          resource: 'IRIS',
          status: {
            _type: 'InUse'
          }
        },
        {
          resource: 'TCS',
          status: {
            _type: 'Available'
          }
        }
      ]
    })
  })

  test('should get unauthorized error when token is not provided | ESW-365', async () => {
    expect.assertions(4)
    await sequenceManagerServiceWithoutToken.configure(new ObsMode('darknight')).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.status).toBe(401)
      expect(e.statusText).toBe('Unauthorized')
      expect(e.message).toBe('The resource requires authentication, which was not supplied with the request')
    })
  })

  test('should get forbidden error when token provided does not have correct access| ESW-365', async () => {
    expect.assertions(4)
    await sequenceManagerServiceWithInValidToken.configure(new ObsMode('darknight')).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.status).toBe(403)
      expect(e.statusText).toBe('Forbidden')
      expect(e.message).toBe('The supplied authentication is not authorized to access this resource')
    })
  })
})
