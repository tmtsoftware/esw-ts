import 'whatwg-fetch'
import {
  BaseKey,
  CommandService,
  Completed,
  ComponentId,
  CurrentState,
  intArrayKey,
  intKey,
  Key,
  Parameter,
  Prefix,
  Result,
  Setup,
  SubmitResponse
} from '../../src'
import { APP_CONFIG_PATH, setAppConfigPath } from '../../src/config/AppConfigPath'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(70000)

const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH
const hcdPrefix = new Prefix('IRIS', 'testHcd')
const componentId = new ComponentId(hcdPrefix, 'HCD')
const cswHcdPrefix = Prefix.fromString('CSW.testHcd')
const key: BaseKey<Key> = new BaseKey('prime numbers', 'IntKey', 'NoUnits')
const keyParameter: Parameter<Key> = key.set([1, 2, 3])
const intArrayParam = intArrayKey('array_key').set([
  [1, 2],
  [3, 4]
])

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  setAppConfigPath('../../test/assets/appconfig/AppConfig.ts')
  await startServices(['AAS', 'Gateway'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
  setAppConfigPath(OLD_APP_CONFIG_PATH)
})

const validToken = 'validToken'

describe('Command Client', () => {
  const validAuthData = { tokenFactory: () => validToken }
  test('should get accepted response on oneway command | ESW-343, ESW-305, ESW-99', async () => {
    const commandService = await CommandService(componentId, validAuthData)
    const setupCommand = new Setup(cswHcdPrefix, 'c1')
    setupCommand.create([keyParameter])

    const actualResponse = await commandService.oneway(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })

  test('should get unauthorized error on sending invalid token | ESW-343, ESW-305, ESW-99, ESW-321', async () => {
    const commandService = await CommandService(componentId)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], '2020A-001-123')

    expect.assertions(4)
    await commandService.oneway(setupCommand).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.status).toBe(401)
      expect(e.statusText).toBe('Unauthorized')
      expect(e.message).toBe(
        'The resource requires authentication, which was not supplied with the request'
      )
    })
  })

  test('should get forbidden error on sending command to different subsystem | ESW-343, ESW-305, ESW-99, ESW-321', async () => {
    const tokenWithoutRole = 'tokenWithoutRole'

    const commandService = await CommandService(componentId, {
      tokenFactory: () => tokenWithoutRole
    })
    const setupCommand = new Setup(cswHcdPrefix, 'c1')
    setupCommand.add(keyParameter)

    expect.assertions(4)
    await commandService.oneway(setupCommand).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.statusText).toBe('Forbidden')
      expect(e.message).toBe(
        'The supplied authentication is not authorized to access this resource'
      )
      expect(e.status).toBe(403)
    })
  })

  test('should be able to submit the given command | ESW-343, ESW-305, ESW-99, ESW-380', async () => {
    const commandService = await CommandService(componentId, validAuthData)
    const setupCommand = new Setup(cswHcdPrefix, 'c1').add(keyParameter)
    const actualResponse = await commandService.submit(setupCommand)
    expect(actualResponse._type).toEqual('Started')
  })

  test('should be able to submitAll the given commands | ESW-344', async () => {
    const commandService = await CommandService(componentId, validAuthData)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], '2020A-001-123')
    const actualResponse = await commandService.submitAllAndWait([setupCommand, setupCommand], 10)
    expect(actualResponse.length).toEqual(2)
    expect(actualResponse[0]._type).toEqual('Completed')
    expect(actualResponse[1]._type).toEqual('Completed')
  })

  test('should be able to send the validate command | ESW-343, ESW-305, ESW-99, ESW-380', async () => {
    const commandService = await CommandService(componentId, validAuthData)
    const setupCommand = new Setup(cswHcdPrefix, 'c1').madd([keyParameter, intArrayParam])
    const actualResponse = await commandService.validate(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })

  test('should be able to query response for the given runId | ESW-343, ESW-305', async () => {
    const commandService = await CommandService(componentId, validAuthData)
    const setupCommand = new Setup(cswHcdPrefix, 'c1')
    setupCommand.madd([keyParameter])

    const submitRes: SubmitResponse = await commandService.submit(setupCommand)
    expect(submitRes._type).toEqual('Started')

    const queryRes = await commandService.query(submitRes.runId)
    expect(queryRes._type).toEqual('Started')
  })

  test('should be able to query the final response for the given runId | ESW-343, ESW-305, ESW-380', async () => {
    const commandService = await CommandService(componentId, validAuthData)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], '2020A-001-123')
    const submitRes: SubmitResponse = await commandService.submit(setupCommand)
    expect(submitRes._type).toEqual('Started')

    const queryRes = await commandService.queryFinal(submitRes.runId, 5)
    const expectedRes: SubmitResponse = {
      _type: 'Completed',
      runId: submitRes.runId,
      result: new Result().add(intKey('numbers').set([1, 2, 3]))
    }
    expect(queryRes).toEqual(expectedRes)

    expect((queryRes as Completed).result.get(intKey('numbers'))).toEqual(
      intKey('numbers').set([1, 2, 3])
    )
  })

  test('should be able to submit and wait for final result of the given command | ESW-344', async () => {
    const commandService = await CommandService(componentId, validAuthData)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], '2020A-001-123')
    const actualResponse = await commandService.submitAndWait(setupCommand, 5)
    expect(actualResponse._type).toEqual('Completed')
  })

  test('should be able to subscribe to the current state | ESW-343, ESW-305', () => {
    return new Promise<void>(async (done) => {
      const commandService = await CommandService(componentId)
      const prefix: Prefix = new Prefix('ESW', 'a.b')

      const callback = (currentState: CurrentState) => {
        expect(currentState.prefix).toEqual(prefix)
        expect(currentState.paramSet).toEqual([])
        subscription.cancel()
        done()
      }
      const subscription = commandService.subscribeCurrentState(
        new Set(['stateName1', 'stateName2'])
      )(callback)
    })
  })
})
