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
  GetSequence,
  GoOffline,
  GoOnline,
  IsAvailable,
  IsOnline,
  OperationsMode,
  Stop,
  AbortSequence,
  StartSequence,
  DiagnosticMode
} from 'clients/sequencer/models/PostCommand'
import { Setup } from 'clients/command/models/PostCommand'
import { SequenceCommand } from 'models/params/Command'
import * as SequencerCommands from '__tests__/jsons/sequencerModels.json'

const setupCommand = new Setup('ESW.test', 'command-1', [])
const sequence: SequenceCommand[] = [setupCommand]
const commands: SequenceCommand[] = [setupCommand]

test('LoadSequence', () => {
  const loadSequence = new LoadSequence(sequence)

  expect(loadSequence).toEqual(SequencerCommands.LoadSequence)
})

test('StartSequence', () => {
  const startSequence = new StartSequence()

  expect(startSequence).toEqual(SequencerCommands.StartSequence)
})

test('Resume', () => {
  const resume: Resume = new Resume()

  expect(resume).toEqual(SequencerCommands.Resume)
})

test('Reset', () => {
  const reset: Reset = new Reset()

  expect(reset).toEqual(SequencerCommands.Reset)
})

test('Pause', () => {
  const pause: Pause = new Pause()

  expect(pause).toEqual(SequencerCommands.Pause)
})

test('Add', () => {
  const add: Add = new Add(commands)

  expect(add).toEqual(SequencerCommands.Add)
})

test('Prepend', () => {
  const prepend: Prepend = new Prepend(commands)

  expect(prepend).toEqual(SequencerCommands.Prepend)
})

test('Replace', () => {
  const replace: Replace = new Replace('id-1234', commands)

  expect(replace).toEqual(SequencerCommands.Replace)
})

test('InsertAfter', () => {
  const insertAfter: InsertAfter = new InsertAfter('id-1234', commands)

  expect(insertAfter).toEqual(SequencerCommands.InsertAfter)
})

test('Delete', () => {
  const deleteCommand: Delete = new Delete('id-1234')

  expect(deleteCommand).toEqual(SequencerCommands.Delete)
})

test('AddBreakpoint', () => {
  const addBreakpoint: AddBreakpoint = new AddBreakpoint('id-1234')

  expect(addBreakpoint).toEqual(SequencerCommands.AddBreakpoint)
})

test('RemoveBreakpoint', () => {
  const removeBreakpoint: RemoveBreakpoint = new RemoveBreakpoint('id-1234')

  expect(removeBreakpoint).toEqual(SequencerCommands.RemoveBreakpoint)
})

test('GetSequence', () => {
  const getSequence: GetSequence = new GetSequence()

  expect(getSequence).toEqual(SequencerCommands.GetSequence)
})

test('IsAvailable', () => {
  const isAvailable: IsAvailable = new IsAvailable()

  expect(isAvailable).toEqual(SequencerCommands.IsAvailable)
})

test('IsOnline', () => {
  const isOnline: IsOnline = new IsOnline()

  expect(isOnline).toEqual(SequencerCommands.IsOnline)
})

test('GoOnline', () => {
  const goOnline: GoOnline = new GoOnline()

  expect(goOnline).toEqual(SequencerCommands.GoOnline)
})

test('GoOffline', () => {
  const goOffline: GoOffline = new GoOffline()

  expect(goOffline).toEqual(SequencerCommands.GoOffline)
})

test('AbortSequence', () => {
  const abortSequence: AbortSequence = new AbortSequence()

  expect(abortSequence).toEqual(SequencerCommands.AbortSequence)
})

test('Stop', () => {
  const stop: Stop = new Stop()

  expect(stop).toEqual(SequencerCommands.Stop)
})

test('OperationsMode', () => {
  const operationsMode: OperationsMode = new OperationsMode()

  expect(operationsMode).toEqual(SequencerCommands.OperationsMode)
})

test('DiagnosticMode', () => {
  const diagnosticMode: DiagnosticMode = new DiagnosticMode(new Date('2020-10-08'), 'start')

  expect(diagnosticMode.toJSON()).toEqual(SequencerCommands.DiagnosticMode)
})
