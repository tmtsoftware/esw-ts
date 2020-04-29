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

test('GetSequence', () => {
  const getSequence: GetSequence = new GetSequence()

  expect(SequencerCommands.GetSequence).toEqual(getSequence)
})

test('IsAvailable', () => {
  const isAvailable: IsAvailable = new IsAvailable()

  expect(SequencerCommands.IsAvailable).toEqual(isAvailable)
})

test('IsOnline', () => {
  const isOnline: IsOnline = new IsOnline()

  expect(SequencerCommands.IsOnline).toEqual(isOnline)
})

test('GoOnline', () => {
  const goOnline: GoOnline = new GoOnline()

  expect(SequencerCommands.GoOnline).toEqual(goOnline)
})

test('GoOffline', () => {
  const goOffline: GoOffline = new GoOffline()

  expect(SequencerCommands.GoOffline).toEqual(goOffline)
})

test('AbortSequence', () => {
  const abortSequence: AbortSequence = new AbortSequence()

  expect(SequencerCommands.AbortSequence).toEqual(abortSequence)
})

test('Stop', () => {
  const stop: Stop = new Stop()

  expect(SequencerCommands.Stop).toEqual(stop)
})

test('OperationsMode', () => {
  const operationsMode: OperationsMode = new OperationsMode()

  expect(SequencerCommands.OperationsMode).toEqual(operationsMode)
})

test('DiagnosticMode', () => {
  const diagnosticMode: DiagnosticMode = new DiagnosticMode(new Date('2020-10-08'), 'start')

  expect(SequencerCommands.DiagnosticMode).toEqual(diagnosticMode.toJSON())
})
