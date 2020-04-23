import { CommandClient } from 'clients/command/CommandClient'
import { ComponentId } from 'models/ComponentId'
import { ControlCommand } from 'clients/command/models/PostCommand'
import {
  OneWayResponse,
  SubmitResponse,
  ValidateResponse
} from 'clients/command/models/CommandResponse'
import { Prefix } from 'models/params/Prefix'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'

jest.mock('utils/Http')
const postMockFn = mocked(post, true)

const compId: ComponentId = {
  prefix: new Prefix('ESW', 'test'),
  componentType: 'Assembly'
}
const client = CommandClient('localhost', 8080, compId)

test('it should post validate command', async () => {
  const acceptedResponse = {
    _type: 'Accepted',
    runId: '1234124'
  }

  postMockFn.mockResolvedValue(acceptedResponse)

  const controlCommand = getControlCommand()
  const data: ValidateResponse = await client.validate(controlCommand)

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(acceptedResponse)
})

test('it should post submit command', async () => {
  const startedResponse: SubmitResponse = {
    _type: 'Started',
    runId: '1234124'
  }

  postMockFn.mockResolvedValue(startedResponse)

  const controlCommand = getControlCommand()
  const data: SubmitResponse = await client.submit(controlCommand)

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(startedResponse)
})

test('it should post oneway command', async () => {
  const acceptedResponse = {
    _type: 'Accepted',
    runId: '1234124'
  }

  postMockFn.mockResolvedValue(acceptedResponse)

  const controlCommand = getControlCommand()
  const data: OneWayResponse = await client.oneway(controlCommand)

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

function getControlCommand(): ControlCommand {
  return {
    _type: 'Setup',
    source: 'esw.test',
    commandName: 'c1',
    maybeObsId: ['obsId'],
    paramSet: []
  }
}

afterEach(() => {
  jest.clearAllMocks()
})
