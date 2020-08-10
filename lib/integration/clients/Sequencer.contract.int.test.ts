import 'whatwg-fetch'
import { getToken } from '../utils/auth'
import { ComponentId, Prefix, SequenceCommand, Setup } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'
import { GenericError } from '../../src/utils/GenericError'
import { SequencerService } from '../../src/clients/sequencer'

jest.setTimeout(90000)

const eswTestPrefix = Prefix.fromString('ESW.test')
const setupCommand2 = new Setup(eswTestPrefix, 'command-2', [])
const sequence2: SequenceCommand[] = [setupCommand2]
let validToken = ''
let sequencerService: SequencerService

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['AAS', 'Gateway'])
  validToken = await getToken('tmt-frontend-app', 'sm-user1', 'sm-user1', 'TMT')
  sequencerService = await SequencerService(componentId, () => validToken)
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})
const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')

describe('Sequencer Client', () => {
  test('is up and available | ESW-307', async () => {
    const available = await sequencerService.isAvailable()

    expect(available).toBeTruthy()
  })

  test('should get unauthorized error when invalid token is provided | ESW-307, ESW-99', async () => {
    sequencerService = await SequencerService(componentId, () => undefined)
    await expect(() => sequencerService.goOffline()).rejects.toThrow(
      new GenericError(401, 'Unauthorized', expect.any(String))
    )
  })

  test('should get ok response on load sequence | ESW-307, ESW-99', async () => {
    sequencerService = await SequencerService(componentId, () => validToken)

    await sequencerService.goOnline()

    const response = await sequencerService.loadSequence(sequence2)
    expect(response._type).toEqual('Ok')
  })
})
