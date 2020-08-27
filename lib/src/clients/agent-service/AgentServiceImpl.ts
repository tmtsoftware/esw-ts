import { Option } from '../..'
import { Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { Connection } from '../location'
import { AgentService } from './AgentService'
import { KillResponse, KillResponseD, SpawnResponse, SpawnResponseD } from './models/AgentRes'
import {
  AgentServiceRequest,
  KillComponent,
  SpawnSequenceComponent,
  SpawnSequenceManager
} from './models/PostCommand'

export class AgentServiceImpl implements AgentService {
  constructor(private readonly httpTransport: HttpTransport<AgentServiceRequest>) {}

  killComponent(connection: Connection): Promise<KillResponse> {
    return this.httpTransport.requestRes(new KillComponent(connection), KillResponseD)
  }

  spawnSequenceComponent(
    agentPrefix: Prefix,
    componentName: string,
    version: Option<string>
  ): Promise<SpawnResponse> {
    return this.httpTransport.requestRes(
      new SpawnSequenceComponent(agentPrefix, componentName, version),
      SpawnResponseD
    )
  }

  spawnSequenceManager(
    agentPrefix: Prefix,
    obsModeConfigPath: string,
    isConfigLocal: boolean,
    version: Option<string>
  ): Promise<SpawnResponse> {
    return this.httpTransport.requestRes(
      new SpawnSequenceManager(agentPrefix, obsModeConfigPath, isConfigLocal, version),
      SpawnResponseD
    )
  }
}
