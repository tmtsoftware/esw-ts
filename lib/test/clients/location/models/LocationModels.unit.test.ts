import {
  AkkaConnection,
  AkkaLocation,
  HttpConnection,
  HttpLocation,
  Location,
  TcpConnection,
  TcpLocation
} from '../../../../src/clients/location'
import { Prefix } from '../../../../src/models'
import * as TestData from '../../../jsons/LocationModels.json'
import { getOrThrow } from '../../../../src/utils/Utils'

const prefix = new Prefix('ESW', 'test')
const uri = 'some uri'

describe('Typed Locations', () => {
  test('Akka Location | ESW-308, ESW-310', () => {
    const akkaConnection = AkkaConnection(prefix, 'Assembly')
    const akkaLocation: AkkaLocation = {
      _type: 'AkkaLocation',
      connection: akkaConnection,
      uri
    }
    const expected = getOrThrow(Location.decode(TestData.AkkaLocation))
    expect(akkaLocation).toEqual(expected)
  })

  test('Http Location | ESW-308, ESW-310', () => {
    const httpConnection = HttpConnection(prefix, 'Assembly')
    const httpLocation: HttpLocation = {
      _type: 'HttpLocation',
      connection: httpConnection,
      uri
    }

    const expected = getOrThrow(Location.decode(TestData.HttpLocation))
    expect(httpLocation).toEqual(expected)
  })

  test('Tcp Location | ESW-308, ESW-310', () => {
    const tcpConnection: TcpConnection = TcpConnection(prefix, 'Assembly')
    const tcpLocation: TcpLocation = {
      _type: 'TcpLocation',
      connection: tcpConnection,
      uri
    }

    const expected = getOrThrow(Location.decode(TestData.TcpLocation))
    expect(tcpLocation).toEqual(expected)
  })
})
