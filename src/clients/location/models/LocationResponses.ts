import { Connection } from 'clients/location/models/Connection'
import { Location } from 'clients/location/models/Location'

export type Done = 'Done'

export class RegistrationResult {
  constructor(
    readonly location: Location,
    readonly unregister: (connection: Connection) => Promise<Done>
  ) {}
}
