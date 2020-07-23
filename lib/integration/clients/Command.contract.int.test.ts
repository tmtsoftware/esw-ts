import { CommandService } from '../../src/clients/command'
import { ComponentId, Prefix, Setup, SubmitResponse } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'
import { getToken } from '../utils/auth'
import { Event, EventKey, EventName, EventService, ObserveEvent } from '../../src/clients/event'

jest.setTimeout(50000)

const hcdPrefix = new Prefix('IRIS', 'testHcd')
const componentId = new ComponentId(hcdPrefix, 'HCD')
const cswHcdPrefix = Prefix.fromString('CSW.testHcd')

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['AAS', 'Gateway', 'Event'])
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

describe('Event Client', () => {
  test('should publish event | ESW-318', async () => {
    const eventService = new EventService()

    const prefix = new Prefix('ESW', 'eventComp')
    const eventName = new EventName('offline')
    const observeEvent = new ObserveEvent(
      'event1',
      prefix,
      eventName,
      new Date(2020, 1, 1).toISOString(),
      []
    )
    const done = await eventService.publish(observeEvent)

    const done1: Done = 'Done'
    expect(done).toEqual(done1)
  })

  test('should get event | ESW-318', async () => {
    const eventService = new EventService()

    const prefix = new Prefix('CSW', 'ncc.trombone')
    const eventName = new EventName('offline')
    const eventKeys = new Set<EventKey>().add(new EventKey(prefix, eventName))

    const observeEvent: Event = (await eventService.get(eventKeys))[0]

    expect(observeEvent._type).toEqual('ObserveEvent')
    expect(observeEvent.source).toEqual(prefix)
    expect(observeEvent.eventName).toEqual(eventName)
  })
})

