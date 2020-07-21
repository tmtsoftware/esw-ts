import { AlarmKey, AlarmService } from '../../src/clients/alarm'
import { CommandService } from '../../src/clients/command'
import { Done } from '../../src/clients/location'
import { SequencerService } from '../../src/clients/sequencer'
import { ComponentId, CurrentState, Prefix, Setup, SubmitResponse } from '../../src/models'
import { getToken } from '../utils/auth'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(90000)

const hcdPrefix = new Prefix('IRIS', 'testHcd')
const componentId = new ComponentId(hcdPrefix, 'HCD')
const cswHcdPrefix = Prefix.fromString('CSW.testHcd')

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

describe('Command Client', () => {
  test('should get accepted response on oneway command | ESW-305', async () => {
    const validToken: string = await getToken(
      'esw-gateway-client',
      'gateway-user1',
      'gateway-user1',
      'TMT-test'
    )

    const commandService = new CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [], ['obsId'])
    const actualResponse = await commandService.oneway(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })

  test('should get unauthorized error on sending invalid token | ESW-305', async () => {
    const commandService = new CommandService(componentId, () => '')
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [], ['obsId'])

    await expect(commandService.oneway(setupCommand)).rejects.toThrow(Error('Unauthorized'))
  })

  test('should get forbidden error on sending command to different subsystem | ESW-305', async () => {
    const tokenWithoutRole: string = await getToken(
      'esw-gateway-client',
      'gateway-user2',
      'gateway-user2',
      'TMT-test'
    )

    const commandService = new CommandService(componentId, () => tokenWithoutRole)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [], ['obsId'])

    await expect(commandService.oneway(setupCommand)).rejects.toThrow(Error('Forbidden'))
  })

  test('should be able to submit the given command | ESW-305', async () => {
    const validToken: string = await getToken(
      'esw-gateway-client',
      'gateway-user1',
      'gateway-user1',
      'TMT-test'
    )

    const commandService = new CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [], ['obsId'])
    const actualResponse = await commandService.submit(setupCommand)
    expect(actualResponse._type).toEqual('Started')
  })

  test('should be able to send the validate command | ESW-305', async () => {
    const validToken: string = await getToken(
      'esw-gateway-client',
      'gateway-user1',
      'gateway-user1',
      'TMT-test'
    )

    const commandService = new CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [], ['obsId'])
    const actualResponse = await commandService.validate(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })

  test('should be able to query response for the given runId | ESW-305', async () => {
    const validToken: string = await getToken(
      'esw-gateway-client',
      'gateway-user1',
      'gateway-user1',
      'TMT-test'
    )

    const commandService = new CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [], ['obsId'])
    const submitRes: SubmitResponse = await commandService.submit(setupCommand)
    expect(submitRes._type).toEqual('Started')

    const queryRes = await commandService.query(submitRes.runId)
    expect(queryRes._type).toEqual('Started')
  })

  test('should be able to query the final response for the given runId | ESW-305', async () => {
    const validToken: string = await getToken(
      'esw-gateway-client',
      'gateway-user1',
      'gateway-user1',
      'TMT-test'
    )

    const commandService = new CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [], ['obsId'])
    const submitRes: SubmitResponse = await commandService.submit(setupCommand)
    expect(submitRes._type).toEqual('Started')

    const queryRes = await commandService.queryFinal(submitRes.runId, 5)
    const expectedRes: SubmitResponse = {
      _type: 'Completed',
      runId: submitRes.runId,
      result: { paramSet: [] }
    }
    expect(queryRes).toEqual(expectedRes)
  })

  test('should be able to subscribe to the current state | ESW-305', () => {
    return new Promise((done) => {
      const commandService = new CommandService(componentId)
      const prefix: Prefix = new Prefix('ESW', 'a.b')

      commandService.subscribeCurrentState(
        new Set(['stateName1', 'stateName2']),
        (currentState) => {
          expect(currentState.prefix).toEqual(prefix)
          expect(currentState.paramSet).toEqual([])
          done()
        }
      )
    })
  })
})

describe('Alarm Client ', () => {
  const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
  test('set severity for the given component | ESW-314', async () => {
    const alarmService = new AlarmService()
    const alarmKey = new AlarmKey(trombonePrefix, 'tromboneAxisHighLimitAlarm')

    const response: Done = await alarmService.setSeverity(alarmKey, 'Okay')

    expect(response).toEqual('Done')
  })
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
