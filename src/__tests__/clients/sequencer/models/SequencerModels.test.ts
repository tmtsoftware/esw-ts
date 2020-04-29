import { LoadSequence, Pause, Resume, StartSequence } from 'clients/sequencer/models/PostCommand'
import { Setup } from 'clients/command/models/PostCommand'
import { SequenceCommand } from 'models/params/Command'
import * as SequencerCommands from '__tests__/jsons/sequencerModels.json'

const setupCommand = new Setup('ESW.test', 'command-1', [])
const sequence: SequenceCommand[] = [setupCommand]

test('LoadSequence', () => {
  const loadSequence = new LoadSequence(sequence)

  expect(SequencerCommands.LoadSequence).toEqual(loadSequence)
})

test('StartSequence', () => {
  const startSequence = new StartSequence()

  expect(SequencerCommands.StartSequence).toEqual(startSequence)
})

test('Resume', () => {
  const resume: Resume = new Resume()

  expect(SequencerCommands.Resume).toEqual(resume)
})

test('Pause', () => {
  const pause: Pause = new Pause()

  expect(SequencerCommands.Pause).toEqual(pause)
})
