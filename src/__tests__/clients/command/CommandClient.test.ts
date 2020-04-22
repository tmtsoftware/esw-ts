import { CommandClient } from 'clients/command/CommandClient'
import { ComponentId } from 'models/ComponentId'
import { Http } from 'utils/Http'
import { ControlCommand, QueryCommand } from 'clients/command/models/PostCommand'
import {
  OneWayResponse,
  SubmitResponse,
  ValidateResponse,
} from 'clients/command/models/CommandResponse'
import { Prefix } from 'models/params/Prefix'

const mockFn = jest.fn()

const compId: ComponentId = {
  prefix: new Prefix('ESW', 'test'),
  componentType: 'Assembly',
}
const client = CommandClient('localhost', 1234, compId)

beforeAll(() => {
  Http.post = mockFn
})

test('it should post validate command', async () => {
  const acceptedResponse = {
    _type: 'Accepted',
    runId: '1234124',
  }

  mockFn.mockReturnValueOnce(acceptedResponse)

  const controlCommand: ControlCommand = getControlCommand()
  const data: ValidateResponse = await client.validate(controlCommand)

  expect(mockFn).toBeCalledTimes(1)
  expect(data).toBe(acceptedResponse)
})

test('it should post submit command', async () => {
  const startedResponse = {
    _type: 'Started',
    runId: '1234124',
  }

  mockFn.mockReturnValueOnce(startedResponse)

  const controlCommand: ControlCommand = getControlCommand()
  const data: SubmitResponse = await client.submit(controlCommand)

  expect(mockFn).toBeCalledTimes(1)
  expect(data).toBe(startedResponse)
})

test('it should post oneway command', async () => {
  const acceptedResponse = {
    _type: 'Accepted',
    runId: '1234124',
  }

  mockFn.mockReturnValueOnce(acceptedResponse)

  const controlCommand: ControlCommand = getControlCommand()
  const data: OneWayResponse = await client.oneway(controlCommand)

  expect(mockFn).toBeCalledTimes(1)
  expect(data).toBe(acceptedResponse)
})

test('it should post query command', async () => {
  const completedResponse = {
    _type: 'Completed',
    runId: '1234124',
  }

  mockFn.mockReturnValueOnce(completedResponse)

  const queryCommand: QueryCommand = {
    _type: 'Query',
    runId: '1234124',
  }
  const data: SubmitResponse = await client.query(queryCommand)

  expect(mockFn).toBeCalledTimes(1)
  expect(data).toBe(completedResponse)
})

function getControlCommand(): ControlCommand {
  return {
    _type: 'Setup',
    source: 'esw.test',
    commandName: 'c1',
    maybeObsId: ['obsId'],
    paramSet: [],
  }
}

afterEach(() => jest.clearAllMocks())
