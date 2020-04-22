import { Parameter } from './Parameter'

export interface CurrentState {
  prefix: string
  stateName: string
  paramSet?: Parameter<any>[]
}
