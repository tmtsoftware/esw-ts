import { Prefix } from '../../../models'
import { requirement } from '../../../utils/Utils'

const invalidChars = new RegExp('.*[\\*\\[\\]\\^\\?\\-].*')

export class AlarmKey {
  constructor(readonly prefix: Prefix, readonly name: string) {
    // requirement(!prefix.componentName.match(invalidChars), 'key contains invalid characters')
    requirement(!name.match(invalidChars), 'key contains invalid characters')
  }
}

export type AlarmSeverity = 'Okay' | 'Warning' | 'Major' | 'Indeterminate' | 'Critical'

export class SetAlarmSeverity {
  readonly _type: 'SetAlarmSeverity' = 'SetAlarmSeverity'
  constructor(readonly alarmKey: AlarmKey, readonly severity: AlarmSeverity) {}
}
