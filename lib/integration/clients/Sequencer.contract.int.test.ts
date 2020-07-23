import { getToken } from '../utils/auth'
import { SequencerService } from '../../src/clients/sequencer'
import { ComponentId, Prefix } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(90000)

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['AAS', 'Gateway'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Sequencer Client', () => {
  test('is up and available | ESW-307', async () => {
    const validToken: string = await getToken(
      'esw-gateway-client',
      'gateway-user1',
      'gateway-user1',
      'TMT-test'
    )

    const sequencerService = new SequencerService(
      new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer'),
      () => validToken
    )

    const available = await sequencerService.isAvailable()

    expect(available).toBeTruthy()
  })

  test('should get unauthorized error when invalid token is provided | ESW-307', async () => {
    const sequencerService = new SequencerService(
      new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer'),
      () => undefined
    )

    await expect(() => sequencerService.goOffline()).rejects.toThrow('Unauthorized')
  })
})
