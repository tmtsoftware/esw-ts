import * as D from 'io-ts/lib/Decoder'
import { Prefix, PrefixD } from '../../../models'
import { ciLiteral } from '../../../utils/Decoder'
import { requirement } from '../../../utils/Utils'

const invalidChars = new RegExp('.*[\\*\\[\\]\\^\\?\\-].*')

export class AlarmKey {
  constructor(readonly prefix: Prefix, readonly name: string) {
    requirement(!prefix.componentName.match(invalidChars), 'key contains invalid characters')
    requirement(!name.match(invalidChars), 'key contains invalid characters')
  }
}

export type AlarmSeverity = D.TypeOf<typeof AlarmSeverityD>

export class SetAlarmSeverity {
  readonly _type: 'SetAlarmSeverity' = 'SetAlarmSeverity'

  constructor(readonly alarmKey: AlarmKey, readonly severity: AlarmSeverity) {}
}

// ############## Decoders ##############
export const AlarmKeyD = D.type({
  prefix: PrefixD,
  name: D.string
})

export const AlarmSeverityD = ciLiteral('Okay', 'Warning', 'Major', 'Indeterminate', 'Critical')
