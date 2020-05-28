import { startSequencer, startServices, stopServices } from 'utils/backend'
import { SequencerService } from 'clients/sequencer'
import { ComponentId, Prefix } from 'models'
import { getToken } from 'utils/auth'

jest.setTimeout(80000)

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await startServices(['AAS', 'Gateway'])
  await startSequencer('ESW', 'MoonNight')
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Sequencer service', () => {
  test('is up and available', async () => {
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

  test('should get unauthorised error when invalid token is provided', async () => {
    const sequencerService = new SequencerService(
      new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer'),
      () => undefined
    )

    await expect(() => sequencerService.goOffline()).rejects.toThrow('Unauthorized')
  })
})
