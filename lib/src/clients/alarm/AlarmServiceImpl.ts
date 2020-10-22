import type { Done } from '../..'
import { DoneD } from '../../decoders/CommonDecoders'
import type { HttpTransport } from '../../utils/HttpTransport'
import type { AlarmService } from './AlarmService'
import type { AlarmSeverity, AlarmKey } from './models/AlarmModels'
import { SetAlarmSeverity } from './models/PostCommand'

export class AlarmServiceImpl implements AlarmService {
  constructor(private readonly httpTransport: HttpTransport<SetAlarmSeverity>) {}

  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done> {
    return this.httpTransport.requestRes(new SetAlarmSeverity(alarmKey, severity), DoneD)
  }
}
