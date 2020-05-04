import { CommandService } from 'clients/command'
import { GatewayConnection } from 'clients/gateway/resolveGateway'
import { HttpLocation } from 'clients/location'
import { Completed, ComponentId, Observe, Prefix, Setup, SubmitResponse } from 'models'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'

jest.mock('utils/Http')
const postMockFn = mocked(post, true)

const uri = 'http://localhost:8080'
const gatewayLocation = new HttpLocation(GatewayConnection, uri)

const compId: ComponentId = new ComponentId(new Prefix('ESW', 'test'), 'Assembly')

const startedResponse: SubmitResponse = {
  _type: 'Started',
  runId: '1234124'
}
const completedResponse: Completed = {
  _type: 'Completed',
  runId: '1234124',
  result: { paramSet: [] }
}
const acceptedResponse = {
  _type: 'Accepted',
  runId: '1234124'
}

const setupCommand = new Setup('esw.test', 'c1', [], ['obsId'])
const observeCommand = new Observe('esw.test', 'c1', [], ['obsId'])
const runId = 'id1234'
const client = new CommandService(compId)

describe('CommandService', () => {
  test.each([
    ['Validate', acceptedResponse, setupCommand],
    ['Submit', startedResponse, setupCommand],
    ['Oneway', acceptedResponse, observeCommand],
    ['Query', completedResponse, runId]
  ])('%s', async (name, expectedResult, commandArg) => {
    postMockFn.mockResolvedValueOnce([gatewayLocation])
    postMockFn.mockResolvedValueOnce(expectedResult)
    // @ts-ignore
    const data = await client[name.toLowerCase()](commandArg)
    expect(data).toEqual(expectedResult)
    expect(postMockFn).toBeCalledTimes(2)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
