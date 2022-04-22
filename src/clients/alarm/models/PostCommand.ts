/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AlarmKey, AlarmSeverity } from './AlarmModels'

export class SetAlarmSeverity {
  readonly _type: 'SetAlarmSeverity' = 'SetAlarmSeverity'

  constructor(readonly alarmKey: AlarmKey, readonly severity: AlarmSeverity) {}
}
