import { Location } from 'clients/location/models/Location'
import { Connection } from 'clients/location/models/Connection'

export type Done = 'Done'

export class RegistrationResult {
  unregister: () => Promise<Done>
  constructor(readonly location: Location, unregister: (connection: Connection) => Promise<Done>) {
    this.unregister = () => unregister(location.connection)
  }
}
