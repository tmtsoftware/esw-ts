import * as D from 'io-ts/lib/Decoder'
import { pipe } from 'fp-ts/lib/pipeable'
import { Decoder } from '../../utils/Decoder'

export class SetAlarmSeverityFailure extends Error {
  readonly _type: 'SetAlarmSeverityFailure' = 'SetAlarmSeverityFailure'

  constructor(readonly msg: string) {
    super(msg)
  }
}

const GatewayException = <T extends string>(type: T): Decoder<{ _type: T; msg: string }> =>
  D.type({
    _type: D.literal(type),
    msg: D.string
  })

export const SetAlarmSeverityFailureD: Decoder<SetAlarmSeverityFailure> = pipe(
  GatewayException('SetAlarmSeverityFailure'),
  D.parse(({ msg }) => {
    return D.success(new SetAlarmSeverityFailure(msg))
  })
)
