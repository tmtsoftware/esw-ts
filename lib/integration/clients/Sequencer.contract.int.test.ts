import 'whatwg-fetch'
import { getToken } from '../utils/auth'
import { ComponentId, Prefix, SequenceCommand, Setup, SubmitResponse } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'
import { SequencerService } from '../../src/clients/sequencer'

jest.setTimeout(90000)

const eswTestPrefix = Prefix.fromString('ESW.test')
const setupCommand = new Setup(eswTestPrefix, 'command', [])
const sequence: SequenceCommand[] = [setupCommand]
let validToken = ''
let sequencerServiceWithToken: SequencerService
const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['AAS', 'Gateway'])
  validToken = await getToken('tmt-frontend-app', 'sm-user1', 'sm-user1', 'TMT')
  sequencerServiceWithToken = await SequencerService(componentId, () => validToken)
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

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
    const response = await sequencerServiceWithToken.loadSequence(sequence)
    expect(response._type).toEqual('Ok')
  })

  test('should get submit response on startSequence | ESW-307, ESW-99', async () => {
    const expectedRes: SubmitResponse = {
      _type: 'Completed',
      result: { paramSet: [] },
      runId: '123'
    }

    const response = await sequencerServiceWithToken.startSequence()
    expect(response).toEqual(expectedRes)
  })

  test('should get ok response on add commands | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.add(sequence)
    expect(response._type).toEqual('Ok')
  })

  test('should get ok response on prepend commands | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.prepend(sequence)
    expect(response._type).toEqual('Ok')
  })

  test('should get ok response on replace | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.replace('123', sequence)
    expect(response._type).toEqual('Ok')
  })

  test('should get ok response on insertAfter | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.insertAfter('123', sequence)
    expect(response._type).toEqual('Ok')
  })

  test('should get ok response on delete | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.delete('123')
    expect(response._type).toEqual('Ok')
  })

  test('should get ok response on addBreakpoint | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.addBreakpoint('123')
    expect(response._type).toEqual('Ok')
  })

  test('should get ok response on removeBreakpoint | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.removeBreakpoint('123')
    expect(response._type).toEqual('Ok')
  })

  test('should get ok response on reset | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.reset()
    expect(response._type).toEqual('Ok')
  })

  test('should get ok response on resume | ESW-307, ESW-99', async () => {
    const response = await sequencerServiceWithToken.resume()
    expect(response._type).toEqual('Ok')
  })
})
