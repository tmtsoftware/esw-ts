import * as D from 'io-ts/lib/Decoder'
import { Prefix, PrefixD } from '../../../models'
import { requirement } from '../../../utils/Utils'
import { ciLiteral } from '../../../utils/Decoder'

const invalidChars = new RegExp('.*[\\*\\[\\]\\^\\?\\-].*')

export class AlarmKey {
  constructor(readonly prefix: Prefix, readonly name: string) {
    requirement(!prefix.componentName.match(invalidChars), 'key contains invalid characters')
    requirement(!name.match(invalidChars), 'key contains invalid characters')
  }
}

export const AlarmKeyD = D.type({
  prefix: PrefixD,
  name: D.string
})

export type AlarmSeverity = D.TypeOf<typeof AlarmSeverity>
export const AlarmSeverity = ciLiteral('Okay', 'Warning', 'Major', 'Indeterminate', 'Critical')

export class SetAlarmSeverity {
  readonly _type: 'SetAlarmSeverity' = 'SetAlarmSeverity'

  constructor(readonly alarmKey: AlarmKey, readonly severity: AlarmSeverity) {}
}
