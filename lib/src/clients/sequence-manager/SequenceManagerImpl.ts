import {SequenceManagerService} from "./SequenceManagerService";
import {ObsMode} from "./models/ObsMode";
import {ConfigureResponse, ConfigureResponseD} from "./models/SequenceManagerRes";
import {HttpTransport} from "../../utils/HttpTransport";
import {Configure, SequenceManagerPostRequest} from "./models/PostCommand";

export class SequenceManagerImpl implements SequenceManagerService {
  constructor(private readonly httpTransport: HttpTransport<SequenceManagerPostRequest>) {}
  configure(obsMode: ObsMode): Promise<ConfigureResponse> {
    return this.httpTransport.requestRes(new Configure(obsMode), ConfigureResponseD)
  }
}
