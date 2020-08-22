import { SequenceManagerConfig } from '../../config/SequenceManagerConfig'
import { Prefix } from '../../models'
import { extractHostPort } from '../../utils/Utils'
import { HttpConnection } from '../location'
import { resolve } from '../location/LocationUtils'

export const SequenceManagerConnection = HttpConnection(
  new Prefix(SequenceManagerConfig.subsystem, SequenceManagerConfig.componentName),
  SequenceManagerConfig.componentType
)

export const resolveSequenceManager: () => Promise<{ port: number; host: string }> = async () => {
  const location = await resolve(SequenceManagerConnection)
  return extractHostPort(location.uri)
}
