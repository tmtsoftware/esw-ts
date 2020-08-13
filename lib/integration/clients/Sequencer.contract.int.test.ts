import 'whatwg-fetch'
import { getToken } from '../utils/auth'
import { ComponentId, Prefix, SequenceCommand, Setup, SubmitResponse } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'
import { SequencerService } from '../../src/clients/sequencer'

jest.setTimeout(90000)

const eswTestPrefix = Prefix.fromString('ESW.test')
const setupCommand2 = new Setup(eswTestPrefix, 'command-2', [])
const sequence2: SequenceCommand[] = [setupCommand2]
let validToken = ''
let sequencerServiceWithToken: SequencerService

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['AAS', 'Gateway'])
  validToken = await getToken('tmt-frontend-app', 'sm-user1', 'sm-user1', 'TMT')
  sequencerServiceWithToken = await SequencerService(componentId, () => validToken)
  await sequencerServiceWithToken.goOnline()
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})
const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')

describe('Sequencer Client', () => {
  test('is up and available | ESW-307', async () => {
    const available = await sequencerServiceWithToken.isAvailable()

    expect(available).toBeTruthy()
  })

  test('should get unauthorized error when invalid token is provided | ESW-307, ESW-99', async () => {
    const sequencerService = await SequencerService(componentId, () => undefined)
    expect.assertions(3)
    await sequencerService.goOffline().catch((e) => {
      expect(e.status).toBe(401)
      expect(e.message).toBe('Unauthorized')
      expect(e.reason).toBe(
        'The resource requires authentication, which was not supplied with the request'
      )
    })
  })

  test('should get ok response on load sequence | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.loadSequence(sequence2)
    expect(response._type).toEqual('Ok')
  })

  test('should get ok response on startSequence | ESW-307, ESW-99', async () => {
    const expectedRes: SubmitResponse = {
      _type: 'Completed',
      result: { paramSet: [] },
      runId: '123'
    }

    const response = await sequencerServiceWithToken.startSequence()
    expect(response).toEqual(expectedRes)
  })

  test('should get ok response on startSequence | ESW-307, ESW-99', async () => {
    const expectedRes: SubmitResponse = {
      _type: 'Completed',
      result: { paramSet: [] },
      runId: '123'
    }

    const response = await sequencerServiceWithToken.startSequence()
    expect(response).toEqual(expectedRes)
  })
})
