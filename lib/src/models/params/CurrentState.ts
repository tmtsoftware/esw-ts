import * as D from 'io-ts/lib/Decoder'
import { ParameterD } from './Parameter'

// todo: scala has state variable ADT (CurrentState | DemandState)
// _type: "CurrentState" prop present in json coming from scala
export const CurrentState = D.type({
  prefix: D.string,
  stateName: D.string,
  paramSet: D.array(ParameterD)
})

export type CurrentState = D.TypeOf<typeof CurrentState>
