import type { AgentService } from '../clients/agent-service'
import type { AlarmService } from '../clients/alarm'
import type { CommandService } from '../clients/command'
import type { EventService } from '../clients/event'
import type { LocationService } from '../clients/location'
import type { SequenceManagerService } from '../clients/sequence-manager'
import type { AuthContextType } from '../components/aas/context/AuthContext'

export const APP_NAME = 'App-Name'

declare global {
  interface Window {
    isMocked?: boolean

    instance<T>(mockedValue: T): T

    mockedAlarmService: AlarmService
    mockedEventService: EventService
    mockedCommandService: CommandService
    mockedLocationService: LocationService
    mockedAgentService: AgentService
    mockedSequenceManager: SequenceManagerService
    auth: AuthContextType
  }
}
