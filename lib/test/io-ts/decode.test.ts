import { Connection } from '../../src/clients/location'
import { Prefix, PrefixD, ValidateResponse } from '../../src/models'
import { get } from '../helpers/TestUtils'

test('Prefix.decode', () => {
  const p1 = PrefixD.decode('ESW.filter.wheel')
  console.log(get(p1))

  const p2: Prefix = new Prefix('ESW', 'filter.wheel')

  const p3 = JSON.stringify(p2)
  console.log(p3)
})

test('Connection.decode', () => {
  const c1 = Connection.decode({
    connectionType: 'akka',
    prefix: 'ESW.filter.wheel',
    componentType: 'HCD'
  })
  console.log(get(c1))

  const c2: Connection = {
    connectionType: 'akka',
    prefix: new Prefix('ESW', 'filter.wheel'),
    componentType: 'HCD'
  }

  const c3 = JSON.stringify(c2)
  console.log(c3)

  const c4 = Connection.decode(JSON.parse(c3))
  console.log(get(c4))
})

test('ValidateResponse', () => {
  console.log(get(ValidateResponse.decode({ _type: 'Accepted', runId: '123' })))
})
