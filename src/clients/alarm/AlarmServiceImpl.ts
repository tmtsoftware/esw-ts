/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AlarmService } from './AlarmService'
import type { Done } from '../..'
import type { AlarmKey, AlarmSeverity } from './models/AlarmModels'
import { SetAlarmSeverity } from './models/PostCommand'
import { DoneD } from '../../decoders/CommonDecoders'
import type { HttpTransport } from '../../utils/HttpTransport'

export class AlarmServiceImpl implements AlarmService {
  constructor(private readonly httpTransport: HttpTransport<SetAlarmSeverity>) {}

  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done> {
    return this.httpTransport.requestRes(new SetAlarmSeverity(alarmKey, severity), DoneD)
  }
}
