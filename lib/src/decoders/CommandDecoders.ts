import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'

import type {
  Command,
  Constructor,
  ControlCommand,
  SequenceCommand
} from '../models/params/Command'
import { Observe, Setup, Wait } from '../models/params/Command'
import type * as CR from '../models/params/CommandResponse'
import { ciLiteral, Decoder } from '../utils/Decoder'
import { ParameterD } from './ParameterDecoder'
import { PrefixD } from './PrefixDecoder'
import { ResultD } from './ResultDecoder'

const SetupL = 'Setup'
const ObserveL = 'Observe'
const WaitL = 'Wait'

const mkCommandD = <L extends string, T extends Command<L>>(
  _type: L,
  apply: Constructor<L, T>
): Decoder<T> =>
  pipe(
    D.intersect(
      D.type({
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

const SetupD: Decoder<Setup> = mkCommandD(SetupL, Setup)
const ObserveD: Decoder<Observe> = mkCommandD(ObserveL, Observe)
const WaitD: Decoder<Wait> = mkCommandD(WaitL, Wait)

export const SequenceCommandD: Decoder<SequenceCommand> = D.sum('_type')({
  [SetupL]: SetupD,
  [ObserveL]: ObserveD,
  [WaitL]: WaitD
})

export const ControlCommandD: Decoder<ControlCommand> = D.sum('_type')({
  [SetupL]: SetupD,
  [ObserveL]: ObserveD
})

//---------- command responses -------------

const ErrorL = 'Error'
const InvalidL = 'Invalid'
const CompletedL = 'Completed'
const LockedL = 'Locked'
const StartedL = 'Started'
const CancelledL = 'Cancelled'
const AcceptedL = 'Accepted'

export const IssueTypesD = ciLiteral(
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

export const CommandIssueD: Decoder<CR.CommandIssue> = D.type({
  _type: IssueTypesD,
  reason: D.string
})

const ErrorD: Decoder<CR.Error> = D.type({
  _type: ciLiteral(ErrorL),
  runId: D.string,
  message: D.string
})

const InvalidD: Decoder<CR.Invalid> = D.type({
  _type: ciLiteral(InvalidL),
  runId: D.string,
  issue: CommandIssueD
})

const CompletedD: Decoder<CR.Completed> = D.type({
  _type: ciLiteral(CompletedL),
  runId: D.string,
  result: ResultD
})

const mkCommandResD = <L extends string>(type: L): Decoder<{ _type: L; runId: string }> =>
  D.type({
    _type: ciLiteral(type),
    runId: D.string
  })

const LockedD: Decoder<CR.Locked> = mkCommandResD(LockedL)
const StartedD: Decoder<CR.Started> = mkCommandResD(StartedL)
const CancelledD: Decoder<CR.Cancelled> = mkCommandResD(CancelledL)
const AcceptedD: Decoder<CR.Accepted> = mkCommandResD(AcceptedL)

export const SubmitResponseD: Decoder<CR.SubmitResponse> = D.sum('_type')({
  [ErrorL]: ErrorD,
  [InvalidL]: InvalidD,
  [LockedL]: LockedD,
  [StartedL]: StartedD,
  [CompletedL]: CompletedD,
  [CancelledL]: CancelledD
})

export const CommandResponseD: Decoder<CR.CommandResponse> = D.sum('_type')({
  [ErrorL]: ErrorD,
  [InvalidL]: InvalidD,
  [LockedL]: LockedD,
  [StartedL]: StartedD,
  [CompletedL]: CompletedD,
  [CancelledL]: CancelledD,
  [AcceptedL]: AcceptedD
})

export const ValidateResponseD: Decoder<CR.ValidateResponse> = D.sum('_type')({
  [AcceptedL]: AcceptedD,
  [InvalidL]: InvalidD,
  [LockedL]: LockedD
})

export const OnewayResponseD: Decoder<CR.OnewayResponse> = D.sum('_type')({
  [AcceptedL]: AcceptedD,
  [InvalidL]: InvalidD,
  [LockedL]: LockedD
})
