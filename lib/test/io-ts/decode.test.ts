import { Connection, ConnectionD } from '../../src/clients/location'
import { Prefix, PrefixD, ValidateResponseD } from '../../src/models'
import { getOrThrow } from './../../src/utils/Utils'

test('Prefix.decode', () => {
  const p1 = PrefixD.decode('ESW.filter.wheel')
  console.log(getOrThrow(p1))

  const p2: Prefix = new Prefix('ESW', 'filter.wheel')

  const p3 = JSON.stringify(p2)
  console.log(p3)
})

test('Connection.decode', () => {
  const c1 = ConnectionD.decode({
    connectionType: 'akka',
    prefix: 'ESW.filter.wheel',
    componentType: 'HCD'
  })
  console.log(getOrThrow(c1))

  const c2: Connection = {
    connectionType: 'akka',
    prefix: new Prefix('ESW', 'filter.wheel'),
    componentType: 'HCD'
  }

  const c3 = JSON.stringify(c2)
  console.log(c3)

  const c4 = ConnectionD.decode(JSON.parse(c3))
  console.log(getOrThrow(c4))
})

test('ValidateResponse', () => {
  console.log(getOrThrow(ValidateResponseD.decode({ _type: 'Accepted', runId: '123' })))
})
