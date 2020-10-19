import {
  EventName,
  intKey,
  IntKey,
  ObserveEvent,
  Option,
  Parameter,
  Prefix,
  StringKey,
  stringKey,
  SystemEvent
} from '@tmtsoftware/esw-ts'
//#event
const source = new Prefix('IRIS', 'filter.wheel')
const eventName = new EventName('temperatures')
const event = SystemEvent.make(source, eventName)

// accessing eventTime
const eventTime = event.eventTime
//#event

//#system-event
//keys
const k1 = intKey('encoder')
const k2 = intKey('speed')
const k3 = stringKey('filter')
const k4 = intKey('notUsed')

//prefixes
const ck1 = Prefix.fromString('wfos.red.filter')
const name1 = new EventName('filterWheel')
const ck3 = Prefix.fromString('iris.imager.filter')
const name3 = new EventName('status')

//parameters
const p1: Parameter<IntKey> = k1.set([22])
const p2: Parameter<IntKey> = k2.set([44])
const p3: Parameter<StringKey> = k3.set(['A', 'B', 'C', 'D'])

//Create SystemEvent using madd
const se1: SystemEvent = SystemEvent.make(ck1, name1).madd([p1, p2])
//Create SystemEvent using make
const se2: SystemEvent = SystemEvent.make(ck3, name3, [p1, p2])
//Create SystemEvent and use add
const se3: SystemEvent = SystemEvent.make(ck3, name3).add(p1).add(p2).add(p3)

//access keys
const k1Exists: Boolean = se1.exists(k1) //true

//access Parameters
const p4: Option<Parameter<IntKey>> = se1.get(k1)

//access values
const v1: Option<number[]> = se1.get(k1)?.values
const v2: Option<number[]> = se2.get(k2)?.values

//remove keys
const se4: SystemEvent = se3.remove(k3)

//add more than one parameters, using madd
const se5: SystemEvent = se4.madd([k3.set(['X', 'Y', 'Z']), k4.set([99, 100])])
const paramSize: number = se5.size()

//update existing key with set
const se6: SystemEvent = se5.add(k2.set([5, 6, 7, 8]))
//#system-event

const d = () => {
  //#observe-event

  //keys
  const k1 = intKey('readoutsCompleted')
  const k2 = intKey('coaddsCompleted')
  const k3 = stringKey('fileID')
  const k4 = intKey('notUsed')

  //prefixes
  const ck1 = Prefix.fromString('iris.ifu.detectorAssembly')
  const name1 = new EventName('readoutEnd')
  const ck3 = Prefix.fromString('wfos.red.detector')
  const name3 = new EventName('exposureStarted')

  //parameters
  const p1: Parameter<IntKey> = k1.set([4])
  const p2: Parameter<IntKey> = k2.set([2])
  const p3: Parameter<StringKey> = k3.set(['WFOS-RED-0001'])

  //Create ObserveEvent using madd
  const se1: ObserveEvent = ObserveEvent.make(ck1, name1).madd([p1, p2])
  //Create ObserveEvent using apply
  const se2: ObserveEvent = ObserveEvent.make(ck3, name3, [p1, p2])
  //Create ObserveEvent and use add
  const se3: ObserveEvent = ObserveEvent.make(ck3, name3)
    .add(p1)
    .add(p2)
    .add(p3)

  //access keys
  const k1Exists: Boolean = se1.exists(k1) //true

  //access Parameters
  const p4: Option<Parameter<IntKey>> = se1.get(k1)

  //access values
  const v1: Option<number[]> = se1.get(k1)?.values
  const v2: Option<number[]> = se2.get(k2)?.values

  //remove keys
  const se4: ObserveEvent = se3.remove(k3)
  //#observe-event
}
const dd = () => {
  //#unique-key
  //keys
  const encoderKey = intKey('encoder')
  const filterKey = intKey('filter')
  const miscKey = intKey('misc')

  //prefix
  const prefix = Prefix.fromString('wfos.blue.filter')

  const name1 = new EventName('filterWheel')

  //params
  const encParam1 = encoderKey.set([1])
  const encParam2 = encoderKey.set([2])

  const encParam3 = encoderKey.set([3])
  const filterParam1 = filterKey.set([1])
  const filterParam2 = filterKey.set([2])

  const filterParam3 = filterKey.set([3])

  const miscParam1 = miscKey.set([100])
  //StatusEvent with duplicate key via constructor
  const systemEvent = SystemEvent.make(prefix, name1, [
    encParam1,
    encParam2,
    encParam3,
    filterParam1,
    filterParam2,
    filterParam3
  ])

  //try adding duplicate keys via add + madd
  const changedStatusEvent = systemEvent
    .add(encParam3)
    .madd([filterParam1, filterParam2, filterParam3])
  //duplicate keys will not be added. Should contain one Encoder and one Filter key
  const uniqueKeys2 = changedStatusEvent.paramSet.map((x) => x.keyName)

  //miscKey(unique) will be added; encoderKey(duplicate) will not be added
  const finalStatusEvent = systemEvent.madd([miscParam1, encParam1])
  //now contains encoderKey, filterKey, miscKey
  const uniqueKeys3 = finalStatusEvent.paramSet.map((x) => x.keyName)
  //#unique-key
}
