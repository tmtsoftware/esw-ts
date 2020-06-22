import { CommandService } from '../../../src/clients/command'
import { GatewayConnection } from '../../../src/clients/gateway/ResolveGateway'
import { HttpLocation } from '../../../src/clients/location'
import {
  Completed,
  ComponentId,
  Observe,
  OneWayResponse,
  Prefix,
  Setup,
  SubmitResponse,
  ValidateResponse
} from '../../../src/models'
import { mocked } from 'ts-jest/utils'
import { post } from '../../../src/utils/Http'

jest.mock('../../../src/utils/Http')
const postMockFn = mocked(post, true)

const uri = 'http://localhost:8080'
const gatewayLocation = new HttpLocation(GatewayConnection, uri)

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')

const client = new CommandService(compId, () => '')
describe('CommandService', () => {
  test('should http validate command | ESW-305', async () => {
    const acceptedResponse = {
      _type: 'Accepted',
      runId: '1234124'
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(acceptedResponse)

    const setupCommand = new Setup('esw.test', 'c1', [], ['obsId'])
    const data: ValidateResponse = await client.validate(setupCommand)

    expect(postMockFn).toBeCalledTimes(2)
    expect(data).toBe(acceptedResponse)
  })

  test('should http submit command | ESW-305', async () => {
    const startedResponse: SubmitResponse = {
      _type: 'Started',
      runId: '1234124'
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(startedResponse)

    const setupCommand = new Setup('esw.test', 'c1', [], ['obsId'])
    const data: SubmitResponse = await client.submit(setupCommand)

    expect(postMockFn).toBeCalledTimes(2)
    expect(data).toBe(startedResponse)
  })

  test('should http oneway command | ESW-305', async () => {
    const acceptedResponse = {
      _type: 'Accepted',
      runId: '1234124'
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(acceptedResponse)

    const observeCommand = new Observe('esw.test', 'c1', [])
    const data: OneWayResponse = await client.oneway(observeCommand)

    expect(postMockFn).toBeCalledTimes(2)
    expect(data).toBe(acceptedResponse)
  })

  test('should http query command | ESW-305', async () => {
    const completedResponse: Completed = {
      _type: 'Completed',
      runId: '1234124',
      result: { paramSet: [] }
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(completedResponse)

    const data: SubmitResponse = await client.query('1234124')

    expect(postMockFn).toBeCalledTimes(2)
    expect(data).toBe(completedResponse)
  })
})

afterEach(() => jest.clearAllMocks())
