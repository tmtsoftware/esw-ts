import { HttpTransport } from '../../utils/HttpTransport'
import { ObsMode } from './models/ObsMode'
import { Configure, SequenceManagerPostRequest } from './models/PostCommand'
import { ConfigureResponse, ConfigureResponseD } from './models/SequenceManagerRes'
import { SequenceManagerService } from './SequenceManagerService'

export class SequenceManagerImpl implements SequenceManagerService {
  constructor(private readonly httpTransport: HttpTransport<SequenceManagerPostRequest>) {}
  configure(obsMode: ObsMode): Promise<ConfigureResponse> {
    return this.httpTransport.requestRes(new Configure(obsMode), ConfigureResponseD)
  }
}
