import { sequenceManagerConnection } from '../../config/Connections'
import { extractHostPort } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'

export const resolveSequenceManager: () => Promise<{ port: number; host: string }> = async () => {
  const location = await resolve(sequenceManagerConnection)
  return extractHostPort(location.uri)
}
