import { CommandClient } from 'clients/command/CommandClient'
import { ComponentId } from 'models/ComponentId'
import { Http } from 'utils/Http'
import { ControlCommand } from 'clients/command/models/PostCommand'
import {
  OneWayResponse,
  SubmitResponse,
  ValidateResponse,
} from 'clients/command/models/CommandResponse'
import { Prefix } from 'models/params/Prefix'
import { Server } from 'mock-socket'
import { CurrentState } from '../../../models/params/CurrentState'
import DoneCallback = jest.DoneCallback

const postMockFn = jest.fn()
//fixme refactor mock server code
let mockServer: Server

const compId: ComponentId = {
  prefix: new Prefix('ESW', 'test'),
  componentType: 'Assembly',
}
const client = CommandClient('localhost', 8080, compId)

beforeAll(() => {
  Http.post = postMockFn
})

test('it should post validate command', async () => {
  const acceptedResponse = {
    _type: 'Accepted',
    runId: '1234124',
  }

  postMockFn.mockReturnValueOnce(acceptedResponse)

  const controlCommand = getControlCommand()
  const data: ValidateResponse = await client.validate(controlCommand)

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(acceptedResponse)
})

test('it should post submit command', async () => {
  const startedResponse = {
    _type: 'Started',
    runId: '1234124',
  }

  postMockFn.mockReturnValueOnce(startedResponse)

  const controlCommand = getControlCommand()
  const data: SubmitResponse = await client.submit(controlCommand)

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(startedResponse)
})

test('it should post oneway command', async () => {
  const acceptedResponse = {
    _type: 'Accepted',
    runId: '1234124',
  }

  postMockFn.mockReturnValueOnce(acceptedResponse)

  const controlCommand = getControlCommand()
  const data: OneWayResponse = await client.oneway(controlCommand)

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(acceptedResponse)
})

test('it should post query command', async () => {
  const completedResponse: SubmitResponse = {
    _type: 'Completed',
    runId: '1234124',
  }

  postMockFn.mockReturnValueOnce(completedResponse)

  const data: SubmitResponse = await client.query('1234124')

  expect(postMockFn).toBeCalledTimes(1)
  expect(data).toBe(completedResponse)
})

test('it should subscribe to current state using websocket', async (done: DoneCallback) => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
  const expectedState: CurrentState = {
    prefix: 'CSW.ncc.trombone',
    stateName: 'stateName1',
  }

  const checkExpectedMessages = (currentState: CurrentState) => {
    expect(currentState).toEqual(expectedState)
    mockServer.close()
    done()
  }

  wsMockWithResolved(expectedState, mockServer).then(() => {
    client.subscribeCurrentState(new Set(['stateName1', 'stateName2']), checkExpectedMessages)
  })
})

test('it should recieve submit response on query final using websocket', async (done: DoneCallback) => {
  mockServer = new Server('ws://localhost:8080/websocket-endpoint')
  const completedResponse: SubmitResponse = {
    _type: 'Completed',
    runId: '1234124',
  }
  const checkExpectedMessages = (submitResponse: SubmitResponse) => {
    expect(submitResponse).toEqual(completedResponse)
    mockServer.close()
    done()
  }

  wsMockWithResolved(completedResponse, mockServer).then(() => {
    client.queryFinal('12345', 1000).then(checkExpectedMessages)
  })
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

const wsMockWithResolved = async (data: any, mockServer: Server) => {
  mockServer.on('connection', (socket) => {
    socket.on('message', () => socket.send(JSON.stringify(data)))
  })
}

afterEach(() => {
  jest.clearAllMocks()
})
