import { HttpTransport } from '../../utils/HttpTransport'
import { ObsMode } from './models/ObsMode'
import { Configure, Provision, SequenceManagerPostRequest } from './models/PostCommand'
import {
  ConfigureResponse,
  ConfigureResponseD,
  ProvisionResponse,
  ProvisionResponseD
} from './models/SequenceManagerRes'
import { SequenceManagerService } from './SequenceManagerService'
import { ProvisionConfig } from './models/ProvisionConfig'

export class SequenceManagerImpl implements SequenceManagerService {
  constructor(private readonly httpTransport: HttpTransport<SequenceManagerPostRequest>) {}
  configure(obsMode: ObsMode): Promise<ConfigureResponse> {
    return this.httpTransport.requestRes(new Configure(obsMode), ConfigureResponseD)
  }

  provision(config: ProvisionConfig): Promise<ProvisionResponse> {
    return this.httpTransport.requestRes(new Provision(config), ProvisionResponseD)
  }
}
