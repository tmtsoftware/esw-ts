import * as t from 'io-ts'
import { ParameterV } from './Parameter'

// todo: scala has state variable ADT (CurrentState | DemandState)
// _type: "CurrentState" prop present in json coming from scala
export const CurrentState = t.type({
  prefix: t.string,
  stateName: t.string,
  paramSet: t.array(ParameterV)
})

export type CurrentState = t.TypeOf<typeof CurrentState>
