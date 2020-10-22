import type { Prefix } from '../../../models'
import { requirement } from '../../../utils/Utils'

const invalidChars = new RegExp('.*[\\*\\[\\]\\^\\?\\-].*')

/**
 * Represents unique alarm in the given subsystem and component e.g. nfiraos.trombone.tromboneaxislowlimitalarm
 * @category Alarm Service
 * @class
 */
export class AlarmKey {
  /**
   * @constructor
   * @note component and name cannot contain invalid characters i.e. `* [ ] ^ -`
   * @param prefix this alarm belongs to e.g. tcs.filter.wheel
   * @param name represents the name of the alarm unique to the component e.g tromboneAxisLowLimitAlarm
   */
  constructor(readonly prefix: Prefix, readonly name: string) {
    requirement(!prefix.componentName.match(invalidChars), 'key contains invalid characters')
    requirement(!name.match(invalidChars), 'key contains invalid characters')
  }
}

/**
 * Represents the alarm severity set by the component developer.
 * @category Alarm Service
 */
export type AlarmSeverity = 'Okay' | 'Warning' | 'Major' | 'Indeterminate' | 'Critical'
