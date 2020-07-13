import { Either, getOrElse } from 'fp-ts/lib/Either'
import { Errors } from 'io-ts'
import Reporter from 'io-ts-reporters'
import { Prefix, PrefixV, ValidateResponse } from '../../src/models'
import { Connection } from '../../src/clients/location'

const get = <A>(e: Either<Errors, A>): A =>
  getOrElse<Errors, A>(() => {
    const err = Reporter.report(e).join(',')
    throw Error('Right value not present, Error: ' + err)
  })(e)

test('Prefix.decode', () => {
  const p1 = PrefixV.decode('ESW.filter.wheel')
  console.log(get(p1))

  const p2: Prefix = new Prefix('ESW', 'filter.wheel')

  console.log(PrefixV.is(p2))

  const p3 = PrefixV.encode(p2)
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

  const c3 = Connection.encode(c2)
  console.log(c3)

  const c4 = Connection.decode(c3)
  console.log(get(c4))
})

test('ValidateResponse', () => {
  console.log(get(ValidateResponse.decode({ _type: 'Accepted', runId: '123' })))
})
