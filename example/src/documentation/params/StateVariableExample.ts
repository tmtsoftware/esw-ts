import {
  booleanKey,
  charKey,
  CurrentState,
  IntKey,
  intKey,
  Option,
  Parameter,
  Prefix,
  stringKey,
  taiTimeKey,
  Units,
  utcTimeKey
} from '@tmtsoftware/esw-ts'
import { TAITime, UTCTime } from '@tmtsoftware/esw-ts/dist/src/models/TMTTime'
//#state-variable
//prefix

const prefix = Prefix.fromString('wfos.prog.cloudcover')

//key
const charKey1 = charKey('charKey')
const intKey1 = intKey('intKey', Units.meter)
const booleanKey1 = booleanKey('booleanKey')
const utcTimeKey1 = utcTimeKey('utcTimeKey')
const notUsedKey = stringKey('notUsed')

//parameters
const charParam = charKey1.set(['A', 'B', 'C'])
const intParam = intKey1.set([1, 2, 3])
const booleanParam = booleanKey1.set([true, false])
const utcTime = utcTimeKey1.set([UTCTime.now()])

//create CurrentState and use sequential add
const cs1 = new CurrentState(prefix, 'testStateName').add(charParam).add(intParam)
//create CurrentState and add more than one Parameters using madd
const cs2 = new CurrentState(prefix, 'testStateName').madd([intParam, booleanParam])
//create CurrentState using apply
const cs3 = new CurrentState(prefix, 'testStateName', [utcTime])

//access keys
const charKeyExists = cs1.exists(charKey1) //true

//access Parameters
const p1: Option<Parameter<IntKey>> = cs1.get(intKey1)

//access values
const v1: Option<string[]> = cs1.get(charKey1)?.values
const v2: Option<boolean[]> = cs2.get(booleanKey1)?.values

//remove keys
const cs4 = cs3.remove(utcTimeKey1)

//update existing keys - set it back by an hour
var today = new Date()
today.setHours(today.getHours() - 1)
const cs5 = cs3.add(utcTimeKey1.set([new UTCTime(today)]))
//#state-variable

// #tmt-time
const utcTime1 = UTCTime.now()
const taiFromUTC = utcTime1.toTAI()
const utcTimeParam = utcTimeKey('utcTimeKey1')
utcTimeParam.set([utcTime1])

const taiTimeParam = taiTimeKey('taiTimeKey1')
const taiTime1 = TAITime.now()
const utcFromTaiTime = taiTime1.toUTC()
taiTimeParam.set([taiTime1])
// #tmt-time