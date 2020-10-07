import type { IntKey, Option, StringKey } from 'esw-ts'
import { stringKey, intKey, Prefix, Parameter, Result } from 'esw-ts'
//#result
//keys

const k1 = intKey('encoder')
const k2 = intKey('windspeed')
const k3 = stringKey('filter')
const k4 = intKey('notUsed')

//prefixes
const prefix = Prefix.fromString('wfos.prog.cloudcover')

//parameters
const p1: Parameter<IntKey> = k1.set([22])
const p2: Parameter<IntKey> = k2.set([44])
const p3: Parameter<StringKey> = k3.set(['A', 'B', 'C', 'D'])

//Create Result using madd
const r1: Result = new Result().madd([p1, p2])
//Create Result using apply
const r2: Result = new Result([p1, p2])
//Create Result and use add
const r3: Result = new Result().add(p1).add(p2).add(p3)

//access keys
const k1Exists: Boolean = r1.exists(k1) //true

//access Parameters
const p4: Option<Parameter<IntKey>> = r1.get(k1)

//access values
const v1: Option<number[]> = r1.get(k1)?.values
const v2: Option<number[]> = r2.get(k2)?.values

//remove keys
const r4: Result = r3.remove(k3)
//#result
