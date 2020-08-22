import { TokenFactory } from '../..'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import { ObsMode } from './models/ObsMode'
import { ConfigureResponse } from './models/SequenceManagerRes'
import { resolveSequenceManager } from './ResolveSequenceManager'
import { SequenceManagerImpl } from './SequenceManagerImpl'

export interface SequenceManagerService {
  configure(obsMode: ObsMode): Promise<ConfigureResponse>
}

export const SequenceManagerService: (
  tokenFactory: TokenFactory
) => Promise<SequenceManagerService> = async (tokenFactory: TokenFactory) => {
  const { host, port } = await resolveSequenceManager()
  const postEndpoint = getPostEndPoint({ host, port })

  return new SequenceManagerImpl(new HttpTransport(postEndpoint, tokenFactory))
}
