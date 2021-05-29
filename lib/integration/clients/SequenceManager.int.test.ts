import 'whatwg-fetch'
import {
  AgentProvisionConfig,
  ComponentId,
  ObsMode,
  Prefix,
  ProvisionConfig,
  SequenceManagerService
} from '../../src'
import { APP_CONFIG_PATH, setAppConfigPath } from '../../src/config/AppConfigPath'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(80000)

const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

let sequenceManagerServiceWithValidToken: SequenceManagerService
let sequenceManagerServiceWithInValidToken: SequenceManagerService
let sequenceManagerServiceWithoutToken: SequenceManagerService

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  setAppConfigPath('../../test/assets/appconfig/AppConfig.ts')
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
  setAppConfigPath(OLD_APP_CONFIG_PATH)
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
          obsMode: {
            name: 'DarkNight_1'
          },
          resources: ['ESW', 'IRIS'],
          sequencers: ['ESW', 'TCS'],
          status: {
            _type: 'Configured'
          }
        },
        {
          obsMode: {
            name: 'DarkNight_2'
          },
          resources: ['IRIS', 'TCS'],
          sequencers: ['ESW', 'IRIS'],
          status: {
            _type: 'Configurable'
          }
        },
        {
          obsMode: {
            name: 'DarkNight_3'
          },
          resources: ['TCS'],
          sequencers: ['TCS'],
          status: {
            _type: 'NonConfigurable'
          }
        }
      ]
    })
  })

  test('startSequencer | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.startSequencer(
      'ESW',
      new ObsMode('darknight')
    )

    expect(response).toEqual({
      _type: 'Started',
      componentId: new ComponentId(new Prefix('ESW', 'darknight'), 'Sequencer')
    })
  })

  test('restartSequencer | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.restartSequencer(
      'ESW',
      new ObsMode('darknight')
    )

    expect(response).toEqual({
      _type: 'Success',
      componentId: new ComponentId(new Prefix('ESW', 'darknight'), 'Sequencer')
    })
  })

  test('shutdownSequencer | ESW-365', async () => {
    const response = await sequenceManagerServiceWithValidToken.shutdownSequencer(
      'ESW',
      new ObsMode('darknight')
    )

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
    const response = await sequenceManagerServiceWithValidToken.shutdownObsModeSequencers(
      new ObsMode('darknight')
    )

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
    const response = await sequenceManagerServiceWithValidToken.shutdownSequenceComponent(
      new Prefix('ESW', 'primary')
    )

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
      expect(e.message).toBe(
        'The resource requires authentication, which was not supplied with the request'
      )
    })
  })

  test('should get forbidden error when token provided does not have correct access| ESW-365', async () => {
    expect.assertions(4)
    await sequenceManagerServiceWithInValidToken.configure(new ObsMode('darknight')).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.status).toBe(403)
      expect(e.statusText).toBe('Forbidden')
      expect(e.message).toBe(
        'The supplied authentication is not authorized to access this resource'
      )
    })
  })
})
