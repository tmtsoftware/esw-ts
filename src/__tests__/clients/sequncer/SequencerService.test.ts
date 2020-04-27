import { SequencerService } from 'clients/sequencer/SequencerService'
import { ComponentId } from 'models/ComponentId'
import { Prefix } from 'models/params/Prefix'
import { Setup } from 'clients/command/models/PostCommand'
import { Ok } from 'clients/sequencer/models/SequencerRes'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'
import { SubmitResponse } from 'models/params/CommandResponse'
import { SequenceCommand } from 'models/params/Command'

const componentId = ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const sequencer = new SequencerService('localhost', 59623, componentId)
const commands: SequenceCommand[] = [Setup('ESW.test', 'command-1', [])]

jest.mock('utils/Http')
const postMockFn = mocked(post, true)

describe('SequencerService', () => {
  test('should load a sequence in given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.loadSequence(Setup('ESW.test', 'command-1', []))
    expect(res).toEqual(Ok)
  })

  test('should start the sequence in given sequencer', async () => {
    const completedResponse: SubmitResponse = {
      _type: 'Completed',
      runId: '1234124'
    }

    postMockFn.mockResolvedValue(completedResponse)

    const res = await sequencer.startSequence()
    expect(res).toEqual(completedResponse)
  })

  test('should add given commands in the sequence of given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.add(commands)
    expect(res).toEqual(Ok)
  })

  test('should prepend given commands in the sequence of given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.prepend(commands)
    expect(res).toEqual(Ok)
  })

  test('should replace given id command with given commands', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.replace('id-123', commands)
    expect(res).toEqual(Ok)
  })

  test('should insert the given commands after given command of given id', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.insertAfter('id-123', commands)
    expect(res).toEqual(Ok)
  })

  test('should delete the given command from sequence', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.delete('id-123')
    expect(res).toEqual(Ok)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
