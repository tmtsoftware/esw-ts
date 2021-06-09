import {
  IntArrayKey,
  intArrayKey,
  Observe,
  Parameter,
  Prefix,
  Setup,
  stringKey,
  Wait
} from '@tmtsoftware/esw-ts'
//#obsid
const obsId: string = 'Obs001'
//#obsid

//#prefix
const prefix: Prefix = new Prefix('NFIRAOS', 'ncc.trombone')
//#prefix
const d = () => {
  //#setup
  const obsId: string = 'Obs001'
  const prefix: Prefix = new Prefix('NFIRAOS', 'ncc.trombone')
  const commandName = 'move'
  const filterKey = intArrayKey('filter')
  const filterParam: Parameter<IntArrayKey> = filterKey.set([
    [1, 2, 3],
    [4, 5, 6]
  ])

  const setup: Setup = new Setup(prefix, commandName, [filterParam], obsId)
  //#setup
}
const dd = () => {
  //#observe
  const obsId: string = 'Obs001'
  const prefix: Prefix = new Prefix('NFIRAOS', 'ncc.trombone')
  const commandName = 'move'
  const filterKey = intArrayKey('filter')
  const filterParam: Parameter<IntArrayKey> = filterKey.set([
    [1, 2, 3],
    [4, 5, 6]
  ])

  const observe: Observe = new Observe(prefix, commandName, [filterParam], obsId)
  //#observe
}
const ddd = () => {
  //#wait
  const obsId: string = 'Obs001'
  const prefix: Prefix = new Prefix('NFIRAOS', 'ncc.trombone')
  const commandName = 'move'
  const filterKey = intArrayKey('filter')
  const filterParam: Parameter<IntArrayKey> = filterKey.set([
    [1, 2, 3],
    [4, 5, 6]
  ])

  const wait: Wait = new Wait(prefix, commandName, [filterParam], obsId)
  //#wait
}

const dddd = () => {
  //#unique-key
  const obsId: string = 'Obs001'
  const prefix: Prefix = new Prefix('NFIRAOS', 'ncc.trombone')
  const commandName = 'move'
  const filterKey = intArrayKey('filter')
  const randomKey = stringKey('directions')
  const filterParam: Parameter<IntArrayKey> = filterKey.set([[1, 2, 3]])
  const param1 = randomKey.set(['east', 'west'])
  const param2 = randomKey.set(['north', 'south'])

  const wait: Wait = new Wait(prefix, commandName, [filterParam], obsId)
  wait.madd([param1, param2])

  //duplicate keys will not be added. Should contain one randomKey and one Filter key
  wait.paramSet.forEach((x) => console.log(x.keyName))
  //#unique-key
}
