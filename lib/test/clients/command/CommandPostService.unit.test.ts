import { mocked } from 'ts-jest/utils'
import { CommandService } from '../../../src/clients/command'
import { GatewayConnection } from '../../../src/clients/gateway/ResolveGateway'
import { HttpLocation } from '../../../src/clients/location'
import {
  ComponentId,
  Observe,
  OnewayResponse,
  Prefix,
  Setup,
  SubmitResponse,
  ValidateResponse
} from '../../../src/models'
import { post } from '../../../src/utils/Http'
import { getMockedToken } from '../../helpers/TokenVerifier'

jest.mock('../../../src/utils/Http')
const postMockFn = mocked(post, true)

const uri = 'http://localhost:8080'
const gatewayLocation: HttpLocation = { _type: 'HttpLocation', connection: GatewayConnection, uri }

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')
const eswTestPrefix = new Prefix('ESW', 'test')

const client = new CommandService(compId, () => 'validToken')
describe('CommandService', () => {
  test('should be able to validate command sent to assembly | ESW-305', async () => {
    const acceptedResponse = {
      _type: 'Accepted',
      runId: '1234124'
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(acceptedResponse)

    const setupCommand = new Setup(eswTestPrefix, 'c1', [], ['obsId'])
    const data: ValidateResponse = await client.validate(setupCommand)

    expect(postMockFn).toBeCalledTimes(2)
    expect(getMockedToken(postMockFn)).toBe('Bearer validToken')
    expect(data).toBe(acceptedResponse)
  })

  test('should be able to submit command to assembly | ESW-305', async () => {
    const startedResponse: SubmitResponse = {
      _type: 'Started',
      runId: '1234124'
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(startedResponse)

    const setupCommand = new Setup(eswTestPrefix, 'c1', [], ['obsId'])
    const data: SubmitResponse = await client.submit(setupCommand)

    expect(postMockFn).toBeCalledTimes(2)
    expect(getMockedToken(postMockFn)).toBe('Bearer validToken')
    expect(data).toBe(startedResponse)
  })

  test('should be able to send oneway command | ESW-305', async () => {
    const acceptedResponse = {
      _type: 'Accepted',
      runId: '1234124'
    }

    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(acceptedResponse)

    const observeCommand = new Observe(eswTestPrefix, 'c1', [])
    const data: OnewayResponse = await client.oneway(observeCommand)

    expect(postMockFn).toBeCalledTimes(2)
    expect(getMockedToken(postMockFn)).toBe('Bearer validToken')
    expect(data).toBe(acceptedResponse)
  })

  test('should be able to send query command | ESW-305', async () => {
    const completedResponse: SubmitResponse = {
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
