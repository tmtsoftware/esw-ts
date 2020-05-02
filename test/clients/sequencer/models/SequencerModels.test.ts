import * as Sequencer from 'clients/sequencer/models/PostCommand'
import * as TestData from 'jsons/sequencerModels.json'
import { SequenceCommand, Setup } from 'models/params/Command'

const setupCommand = new Setup('ESW.test', 'command-1', [])
const sequence: SequenceCommand[] = [setupCommand]
const commands: SequenceCommand[] = [setupCommand]
const id = 'id-1234'
const date = new Date('2020-10-08')

describe('Sequencer Models Contract', () => {
  test.each([
    ['LoadSequence', new Sequencer.LoadSequence(sequence), TestData.LoadSequence],
    ['StartSequence', new Sequencer.StartSequence(), TestData.StartSequence],
    ['Resume', new Sequencer.Resume(), TestData.Resume],
    ['Reset', new Sequencer.Reset(), TestData.Reset],
    ['Pause', new Sequencer.Pause(), TestData.Pause],
    ['Add', new Sequencer.Add(commands), TestData.Add],
    ['Prepend', new Sequencer.Prepend(commands), TestData.Prepend],
    ['Replace', new Sequencer.Replace(id, commands), TestData.Replace],
    ['InsertAfter', new Sequencer.InsertAfter(id, commands), TestData.InsertAfter],
    ['Delete', new Sequencer.Delete(id), TestData.Delete],
    ['AddBreakpoint', new Sequencer.AddBreakpoint(id), TestData.AddBreakpoint],
    ['RemoveBreakpoint', new Sequencer.RemoveBreakpoint(id), TestData.RemoveBreakpoint],
    ['GetSequence', new Sequencer.GetSequence(), TestData.GetSequence],
    ['IsAvailable', new Sequencer.IsAvailable(), TestData.IsAvailable],
    ['IsOnline', new Sequencer.IsOnline(), TestData.IsOnline],
    ['GoOnline', new Sequencer.GoOnline(), TestData.GoOnline],
    ['GoOffline', new Sequencer.GoOffline(), TestData.GoOffline],
    ['AbortSequence', new Sequencer.AbortSequence(), TestData.AbortSequence],
    ['Stop', new Sequencer.Stop(), TestData.Stop],
    ['OperationsMode', new Sequencer.OperationsMode(), TestData.OperationsMode],
    ['DiagnosticMode', new Sequencer.DiagnosticMode(date, 'start'), TestData.DiagnosticMode]
  ])('%s', (_, actual, expected) => expect(JSON.parse(JSON.stringify(actual))).toEqual(expected))
})
