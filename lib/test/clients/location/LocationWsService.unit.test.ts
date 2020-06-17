import {
  HttpConnection,
  HttpLocation,
  LocationService,
  LocationUpdated
} from '../../../src/clients/location'
import { Server } from 'mock-socket'
import { Prefix } from '../../../src/models'
import { wsMockWithResolved } from '../../utils/MockHelpers'

let mockServer: Server
const uri = 'http://someuri'
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = new HttpConnection(prefix, 'Sequencer')
const httpLocation: HttpLocation = new HttpLocation(httpConnection, uri)

const locationService = new LocationService()

beforeEach(() => {
  mockServer = new Server('ws://localhost:7654/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})

test('location service must track a location for given connection | ESW-308, ESW-310, ESW-311', () => {
  const expectedTrackingEvent: LocationUpdated = {
    _type: 'LocationUpdated',
    location: httpLocation
  }
  wsMockWithResolved(expectedTrackingEvent, mockServer)

  return new Promise((done) => {
    locationService.track(httpConnection, (trackingEvent) => {
      expect(trackingEvent).toEqual(JSON.parse(JSON.stringify(expectedTrackingEvent)))
      done()
    })
  })
})
