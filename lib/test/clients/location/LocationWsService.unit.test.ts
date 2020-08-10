import {
  HttpConnection,
  HttpLocation,
  LocationUpdated,
  TrackingEvent
} from '../../../src/clients/location'
import { Server } from 'mock-socket'
import { Prefix } from '../../../src/models'
import { mockHttpTransport, wsMockWithResolved } from '../../helpers/MockHelpers'
import { LocationServiceImpl } from '../../../src/clients/location/LocationService'
let mockServer: Server
const uri = 'http://someuri'
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = HttpConnection(prefix, 'Sequencer')
const httpLocation: HttpLocation = { _type: 'HttpLocation', connection: httpConnection, uri }

const locationService = new LocationServiceImpl(mockHttpTransport(jest.fn()))

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
    const callback = (trackingEvent: TrackingEvent) => {
      expect(trackingEvent).toEqual(expectedTrackingEvent)
      done()
    }
    locationService.track(httpConnection)(callback)
  })
})
