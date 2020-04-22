import { CommandClient } from 'clients/command/CommandClient'
import { ComponentId } from 'models/componentId'
import { Http } from 'utils/Http'
import { ControlCommand } from 'clients/command/models/PostCommand'
import { ValidateResponse } from 'clients/command/models/CommandResponse'
import { Prefix } from 'models/params/Prefix'

const mockFn = jest.fn()

beforeAll(() => {
  Http.post = mockFn
})

test('it should post validate command', async () => {
  const compId: ComponentId = {
    prefix: new Prefix('ESW', 'test'),
    componentType: 'Assembly',
  }
  const acceptedResponse = {
    _type: 'Accepted',
    runId: '1234124',
  }

  mockFn.mockReturnValueOnce(acceptedResponse)

  const client = CommandClient('localhost', 1234, compId)
  const controlCommand: ControlCommand = getControlCommand()
  const data: ValidateResponse = await client.validate(controlCommand)

  expect(mockFn).toBeCalledTimes(1)
  expect(data).toBe(acceptedResponse)
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

afterAll(() => jest.clearAllMocks())
