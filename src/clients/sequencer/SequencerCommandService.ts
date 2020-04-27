import { ComponentId } from 'models/ComponentId'
import { post } from 'utils/Http'
import { OkOrUnhandledResponse } from 'clients/sequencer/models/SequencerRes'
import { GatewaySequencerCommand } from 'clients/gateway/models/Gateway'
import { LoadSequence, Sequence } from 'clients/sequencer/models/PostCommand'

export class SequencerCommandService {
  constructor(readonly host: string, readonly port: number, readonly componentId: ComponentId) {}

  private httpPost<T>(gatewayCommand: GatewaySequencerCommand) {
    return post<GatewaySequencerCommand, T>(this.host, this.port, gatewayCommand)
  }

  loadSequence(sequence: Sequence): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, LoadSequence(sequence))
    )
  }
}
