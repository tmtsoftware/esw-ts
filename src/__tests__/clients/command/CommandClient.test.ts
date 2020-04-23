import { CommandClient } from 'clients/command/CommandClient'
import { ComponentId } from 'models/ComponentId'
import { ControlCommand } from 'clients/command/models/PostCommand'
import {
  OneWayResponse,
  SubmitResponse,
  ValidateResponse
} from 'clients/command/models/CommandResponse'
import { Prefix } from 'models/params/Prefix'
import { Server } from 'mock-socket'
import { CurrentState } from 'models/params/CurrentState'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'

jest.mock('utils/Http')

const postMockFn = mocked(post, true)
//fixme refactor mock server code
let mockServer: Server

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

test('it should subscribe to current state using websocket', async () => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
  const expectedState: CurrentState = {
    prefix: 'CSW.ncc.trombone',
    stateName: 'stateName1'
  }

  const checkExpectedMessages = (currentState: CurrentState) => {
    mockServer.close()
    expect(currentState).toEqual(expectedState)
  }

  await wsMockWithResolved(expectedState, mockServer)
  client.subscribeCurrentState(new Set(['stateName1', 'stateName2']), checkExpectedMessages)
})

test('it should recieve submit response on query final using websocket', async () => {
  mockServer.close()
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
  const completedResponse: SubmitResponse = {
    _type: 'Completed',
    runId: '1234124'
  }
  const checkExpectedMessages = (submitResponse: SubmitResponse) => {
    expect(submitResponse).toEqual(completedResponse)
    mockServer.close()
  }

  await wsMockWithResolved(completedResponse, mockServer)
  const response = await client.queryFinal('12345', 1000)
  checkExpectedMessages(response)
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wsMockWithResolved = async (data: any, mockServer: Server) => {
  mockServer.on('connection', (socket) => {
    socket.on('message', () => socket.send(JSON.stringify(data)))
  })
}

afterEach(() => {
  jest.clearAllMocks()
})
