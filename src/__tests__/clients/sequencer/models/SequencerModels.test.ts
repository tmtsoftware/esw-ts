import {
  Add,
  AddBreakpoint,
  Delete,
  InsertAfter,
  LoadSequence,
  Pause,
  Prepend,
  RemoveBreakpoint,
  Replace,
  Reset,
  Resume,
  StartSequence
} from 'clients/sequencer/models/PostCommand'
import { Setup } from 'clients/command/models/PostCommand'
import { SequenceCommand } from 'models/params/Command'
import * as SequencerCommands from '__tests__/jsons/sequencerModels.json'

const setupCommand = new Setup('ESW.test', 'command-1', [])
const sequence: SequenceCommand[] = [setupCommand]
const commands: SequenceCommand[] = [setupCommand]

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

test('Reset', () => {
  const reset: Reset = new Reset()

  expect(SequencerCommands.Reset).toEqual(reset)
})

test('Pause', () => {
  const pause: Pause = new Pause()

  expect(SequencerCommands.Pause).toEqual(pause)
})

test('Add', () => {
  const add: Add = new Add(commands)

  expect(SequencerCommands.Add).toEqual(add)
})

test('Prepend', () => {
  const prepend: Prepend = new Prepend(commands)

  expect(SequencerCommands.Prepend).toEqual(prepend)
})

test('Replace', () => {
  const replace: Replace = new Replace('id-1234', commands)

  expect(SequencerCommands.Replace).toEqual(replace)
})

test('InsertAfter', () => {
  const insertAfter: InsertAfter = new InsertAfter('id-1234', commands)

  expect(SequencerCommands.InsertAfter).toEqual(insertAfter)
})

test('Delete', () => {
  const deleteCommand: Delete = new Delete('id-1234')

  expect(SequencerCommands.Delete).toEqual(deleteCommand)
})

test('AddBreakpoint', () => {
  const addBreakpoint: AddBreakpoint = new AddBreakpoint('id-1234')

  expect(SequencerCommands.AddBreakpoint).toEqual(addBreakpoint)
})

test('RemoveBreakpoint', () => {
  const removeBreakpoint: RemoveBreakpoint = new RemoveBreakpoint('id-1234')

  expect(SequencerCommands.RemoveBreakpoint).toEqual(removeBreakpoint)
})
