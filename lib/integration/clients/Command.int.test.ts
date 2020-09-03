import 'whatwg-fetch'
import { mocked } from 'ts-jest/utils'
import { CommandService } from '../../src/clients/command'
import {
  BaseKey,
  ComponentId,
  CurrentState,
  Key,
  Parameter,
  Prefix,
  Result,
  Setup,
  SubmitResponse
} from '../../src/models'
import { dynamicImport } from '../../src/utils/DynamicLoader'
import { getToken } from '../utils/auth'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(70000)

/** Web application name loading is mocked at integration level
 * since the application config does not exist in library and
 * it will be coming at runtime from application source code
 */
jest.mock('../../src/utils/DynamicLoader')
const mockImport = mocked(dynamicImport)
mockImport.mockResolvedValue({ AppConfig: { applicationName: 'example' } })

const hcdPrefix = new Prefix('IRIS', 'testHcd')
const componentId = new ComponentId(hcdPrefix, 'HCD')
const cswHcdPrefix = Prefix.fromString('CSW.testHcd')
const key: BaseKey<Key> = new BaseKey('prime numbers', 'IntKey', 'NoUnits')

const keyParameter: Parameter<Key> = key.set([1, 2, 3])
beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await startServices(['AAS', 'Gateway'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Command Client', () => {
  test('should get accepted response on oneway command | ESW-343, ESW-305, ESW-99', async () => {
    const validToken: string = await getToken(
      'tmt-frontend-app',
      'gateway-user1',
      'gateway-user1',
      'TMT'
    )

    const commandService = await CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [], ['obsId'])
    const actualResponse = await commandService.oneway(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })

  test('should get unauthorized error on sending invalid token | ESW-343, ESW-305, ESW-99, ESW-321', async () => {
    const commandService = await CommandService(componentId, () => '')
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], ['obsId'])

    expect.assertions(3)
    await commandService.oneway(setupCommand).catch((e) => {
      expect(e.status).toBe(401)
      expect(e.message).toBe('Unauthorized')
      expect(e.reason).toBe(
        'The resource requires authentication, which was not supplied with the request'
      )
    })
  })

  test('should get forbidden error on sending command to different subsystem | ESW-343, ESW-305, ESW-99, ESW-321', async () => {
    const tokenWithoutRole: string = await getToken(
      'tmt-frontend-app',
      'gateway-user2',
      'gateway-user2',
      'TMT'
    )

    const commandService = await CommandService(componentId, () => tokenWithoutRole)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], ['obsId'])

    expect.assertions(3)
    await commandService.oneway(setupCommand).catch((e) => {
      expect(e.status).toBe(403)
      expect(e.message).toBe('Forbidden')
      expect(e.reason).toBe('The supplied authentication is not authorized to access this resource')
    })
  })

  test('should be able to submit the given command | ESW-343, ESW-305, ESW-99', async () => {
    const validToken: string = await getToken(
      'tmt-frontend-app',
      'gateway-user1',
      'gateway-user1',
      'TMT'
    )

    const commandService = await CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], ['obsId'])
    const actualResponse = await commandService.submit(setupCommand)
    expect(actualResponse._type).toEqual('Started')
  })

  test('should be able to send the validate command | ESW-343, ESW-305, ESW-99', async () => {
    const validToken: string = await getToken(
      'tmt-frontend-app',
      'gateway-user1',
      'gateway-user1',
      'TMT'
    )

    const commandService = await CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], ['obsId'])
    const actualResponse = await commandService.validate(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })

  test('should be able to query response for the given runId | ESW-343, ESW-305', async () => {
    const validToken: string = await getToken(
      'tmt-frontend-app',
      'gateway-user1',
      'gateway-user1',
      'TMT'
    )

    const commandService = await CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], ['obsId'])
    const submitRes: SubmitResponse = await commandService.submit(setupCommand)
    expect(submitRes._type).toEqual('Started')

    const queryRes = await commandService.query(submitRes.runId)
    expect(queryRes._type).toEqual('Started')
  })

  test('should be able to query the final response for the given runId | ESW-343, ESW-305', async () => {
    const validToken: string = await getToken(
      'tmt-frontend-app',
      'gateway-user1',
      'gateway-user1',
      'TMT'
    )

    const commandService = await CommandService(componentId, () => validToken)
    const setupCommand = new Setup(cswHcdPrefix, 'c1', [keyParameter], ['obsId'])
    const submitRes: SubmitResponse = await commandService.submit(setupCommand)
    expect(submitRes._type).toEqual('Started')

    const queryRes = await commandService.queryFinal(submitRes.runId, 5)
    const expectedRes: SubmitResponse = {
      _type: 'Completed',
      runId: submitRes.runId,
      result: new Result()
    }
    expect(queryRes).toEqual(expectedRes)
  })

  test('should be able to subscribe to the current state | ESW-343, ESW-305', () => {
    return new Promise(async (done) => {
      const commandService = await CommandService(componentId, () => undefined)
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
