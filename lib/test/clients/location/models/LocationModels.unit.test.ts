import {
  AkkaConnection,
  HttpConnection,
  TcpConnection,
  AkkaLocation,
  HttpLocation,
  TcpLocation
} from '../../../../src/clients/location'

import * as TestData from '../../../jsons/LocationModels.json'
import { Prefix } from '../../../../src/models'

const prefix = new Prefix('ESW', 'test')
const uri = 'some uri'

describe('Typed Locations', () => {
  test('Akka Location', () => {
    const akkaConnection = new AkkaConnection(prefix, 'Assembly')
    const akkaLocation = new AkkaLocation(akkaConnection, uri)

    expect(JSON.parse(JSON.stringify(akkaLocation))).toEqual(TestData.AkkaLocation)
  })

  test('Http Location', () => {
    const httpConnection = new HttpConnection(prefix, 'Assembly')
    const httpLocation = new HttpLocation(httpConnection, uri)

    expect(JSON.parse(JSON.stringify(httpLocation))).toEqual(TestData.HttpLocation)
  })

  test('Tcp Location', () => {
    const tcpConnection: TcpConnection = new TcpConnection(prefix, 'Assembly')
    const tcpLocation = new TcpLocation(tcpConnection, uri)

    expect(JSON.parse(JSON.stringify(tcpLocation))).toEqual(TestData.TcpLocation)
  })
})
