import { CommandService } from 'clients'
import { ComponentId } from 'models/ComponentId'
import { Setup, Observe } from 'clients/command/models/PostCommand'
import { OneWayResponse, SubmitResponse, ValidateResponse } from 'models/params/CommandResponse'
import { Prefix } from 'models/params/Prefix'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'

jest.mock('utils/Http')
const postMockFn = mocked(post, true)

const compId: ComponentId = ComponentId(new Prefix('ESW', 'test'), 'Assembly')

const client = new CommandService('localhost', 8080, compId)

test('it should post validate command', async () => {
  const acceptedResponse = {
    _type: 'Accepted',
    runId: '1234124'
  }

  postMockFn.mockResolvedValue(acceptedResponse)

  const setupCommand = new Setup('esw.test', 'c1', [], ['obsId'])
  const data: ValidateResponse = await client.validate(setupCommand)

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(acceptedResponse)
})

test('it should post submit command', async () => {
  const startedResponse: SubmitResponse = {
    _type: 'Started',
    runId: '1234124'
  }

  postMockFn.mockResolvedValue(startedResponse)

  const setupCommand = new Setup('esw.test', 'c1', [], ['obsId'])
  const data: SubmitResponse = await client.submit(setupCommand)

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(startedResponse)
})

test('it should post oneway command', async () => {
  const acceptedResponse = {
    _type: 'Accepted',
    runId: '1234124'
  }

  postMockFn.mockResolvedValue(acceptedResponse)
  const observeCommand = new Observe('esw.test', 'c1', [], ['obsId'])
  const data: OneWayResponse = await client.oneway(observeCommand)

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(acceptedResponse)
})

test('it should post query command', async () => {
  const completedResponse: SubmitResponse = {
    _type: 'Completed',
    runId: '1234124'
  }

  postMockFn.mockResolvedValue(completedResponse)

  const data: SubmitResponse = await client.query('1234124')

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(completedResponse)
})

afterEach(() => {
  jest.clearAllMocks()
})
