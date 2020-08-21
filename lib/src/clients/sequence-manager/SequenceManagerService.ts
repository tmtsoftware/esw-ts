import { ObsMode } from './models/ObsMode'
import { ConfigureResponse, ProvisionResponse } from './models/SequenceManagerRes'
import { TokenFactory } from '../..'
import { getPostEndPoint } from '../../utils/Utils'
import { HttpTransport } from '../../utils/HttpTransport'
import { resolveSequenceManager } from './ResolveSequenceManager'
import { SequenceManagerImpl } from './SequenceManagerImpl'
import { ProvisionConfig } from './models/ProvisionConfig'

export interface SequenceManagerService {
  configure(obsMode: ObsMode): Promise<ConfigureResponse>
  provision(config: ProvisionConfig): Promise<ProvisionResponse>
}

export const SequenceManagerService: (
  tokenFactory: TokenFactory
) => Promise<SequenceManagerService> = async (tokenFactory: TokenFactory) => {
  const { host, port } = await resolveSequenceManager()
  const postEndpoint = getPostEndPoint({ host, port })

  return new SequenceManagerImpl(new HttpTransport(postEndpoint, tokenFactory))
}
