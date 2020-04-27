import { SequencerService } from 'clients/sequencer/SequencerService'
import { ComponentId } from 'models/ComponentId'
import { Prefix } from 'models/params/Prefix'
import { Setup } from 'clients/command/models/PostCommand'
import { Ok } from 'clients/sequencer/models/SequencerRes'
import { mocked } from 'ts-jest/utils'
import { post } from 'utils/Http'

const componentId = ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const sequencer = new SequencerService('localhost', 59623, componentId)

jest.mock('utils/Http')
const postMockFn = mocked(post, true)

describe('SequencerService', () => {
  test('should load a sequence in given sequencer', async () => {
    postMockFn.mockResolvedValue(Ok)

    const res = await sequencer.loadSequence(Setup('ESW.test', 'command-1', []))
    expect(res).toEqual(Ok)
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
