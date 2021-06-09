import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/es6/Decoder'
import type { Command, CommandType, Constructor, ControlCommand, SequenceCommand } from '../models'
import { Observe, Setup, Wait } from '../models'
import type * as CR from '../models/params/CommandResponse'
import { ciLiteral, Decoder } from './Decoder'
import { ParameterD } from './ParameterDecoder'
import { PrefixD } from './PrefixDecoder'
import { ResultD } from './ResultDecoder'

const mkCommandD = <L extends CommandType, T extends Command<L>>(
  _type: L,
  apply: Constructor<L, T>
): Decoder<T> =>
  pipe(
    D.intersect(
      D.struct({
        _type: ciLiteral(_type),
        source: PrefixD,
        commandName: D.string,
        paramSet: D.array(ParameterD)
      })
    )(D.partial({ maybeObsId: D.string })),
    D.parse((command) =>
      D.success(
        new apply(command.source, command.commandName, command.paramSet, command.maybeObsId)
      )
    )
  )

const SetupD: Decoder<Setup> = mkCommandD('Setup', Setup)
const ObserveD: Decoder<Observe> = mkCommandD('Observe', Observe)
const WaitD: Decoder<Wait> = mkCommandD('Wait', Wait)

export const SequenceCommandD: Decoder<SequenceCommand> = D.sum('_type')({
  Setup: SetupD,
  Observe: ObserveD,
  Wait: WaitD
})

export const ControlCommandD: Decoder<ControlCommand> = D.sum('_type')({
  Setup: SetupD,
  Observe: ObserveD
})

//---------- command responses -------------

export const IssueTypesD: Decoder<CR.IssueTypes> = ciLiteral(
  'AssemblyBusyIssue',
  'HCDBusyIssue',
  'IdNotAvailableIssue',
  'MissingKeyIssue',
  'OtherIssue',
  'ParameterValueOutOfRangeIssue',
  'RequiredAssemblyUnavailableIssue',
  'RequiredHCDUnavailableIssue',
  'RequiredSequencerUnavailableIssue',
  'RequiredServiceUnavailableIssue',
  'UnresolvedLocationsIssue',
  'UnsupportedCommandInStateIssue',
  'UnsupportedCommandIssue',
  'WrongInternalStateIssue',
  'WrongNumberOfParametersIssue',
  'WrongParameterTypeIssue',
  'WrongPrefixIssue',
  'WrongUnitsIssue'
)

export const CommandIssueD: Decoder<CR.CommandIssue> = D.struct({
  _type: IssueTypesD,
  reason: D.string
})

const ErrorD: Decoder<CR.Error> = D.struct({
  _type: ciLiteral('Error'),
  runId: D.string,
  message: D.string
})

const InvalidD: Decoder<CR.Invalid> = D.struct({
  _type: ciLiteral('Invalid'),
  runId: D.string,
  issue: CommandIssueD
})

const CompletedD: Decoder<CR.Completed> = D.struct({
  _type: ciLiteral('Completed'),
  runId: D.string,
  result: ResultD
})

const mkCommandResD = <L extends string>(type: L): Decoder<{ _type: L; runId: string }> =>
  D.struct({
    _type: ciLiteral(type),
    runId: D.string
  })

const LockedD: Decoder<CR.Locked> = mkCommandResD('Locked')
const StartedD: Decoder<CR.Started> = mkCommandResD('Started')
const CancelledD: Decoder<CR.Cancelled> = mkCommandResD('Cancelled')
const AcceptedD: Decoder<CR.Accepted> = mkCommandResD('Accepted')

export const SubmitResponseD: Decoder<CR.SubmitResponse> = D.sum('_type')({
  Error: ErrorD,
  Invalid: InvalidD,
  Locked: LockedD,
  Started: StartedD,
  Completed: CompletedD,
  Cancelled: CancelledD
})

export const CommandResponseD: Decoder<CR.CommandResponse> = D.sum('_type')({
  Error: ErrorD,
  Invalid: InvalidD,
  Locked: LockedD,
  Started: StartedD,
  Completed: CompletedD,
  Cancelled: CancelledD,
  Accepted: AcceptedD
})

export const ValidateResponseD: Decoder<CR.ValidateResponse> = D.sum('_type')({
  Accepted: AcceptedD,
  Invalid: InvalidD,
  Locked: LockedD
})

export const OnewayResponseD: Decoder<CR.OnewayResponse> = D.sum('_type')({
  Accepted: AcceptedD,
  Invalid: InvalidD,
  Locked: LockedD
})

export const SequenceCommandsD = D.array(SequenceCommandD)
