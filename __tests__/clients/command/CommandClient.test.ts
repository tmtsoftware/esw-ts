import { CommandClient } from '../../../src/clients/command/CommandClient'
import { ComponentId } from '../../../src/models/componentId'
import { Http } from '../../../src/utils/Http'
import { ControlCommand } from '../../../src/clients/command/models/PostCommand'
import { ValidateResponse } from '../../../src/clients/command/models/CommandResponse'
import { Prefix } from '../../../src/models/params/Prefix'

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
