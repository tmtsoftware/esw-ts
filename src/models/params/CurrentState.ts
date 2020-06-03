import { Parameter } from './Parameter'

export interface CurrentState {
  readonly prefix: string
  readonly stateName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly paramSet?: Parameter<any>[]
}
