import { Server } from 'mock-socket'
import { wsMockWithResolved } from 'utils/MockHelpers'
import { LocationUpdated } from 'clients/location/models/TrackingEvent'
import { Prefix } from 'models/params/Prefix'
import { HttpConnection } from 'clients/location/models/Connection'
import { HttpLocation } from 'clients/location/models/Location'
import { LocationService } from 'clients/location/LocationService'

let mockServer: Server
const uri = 'http://someuri'
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = new HttpConnection(prefix, 'Sequencer')
const httpLocation = new HttpLocation(httpConnection, uri)

const locationService = new LocationService('localhost', 7654)

beforeEach(() => {
  mockServer = new Server('ws://localhost:7654/websocket-endpoint')
})

afterEach(() => {
  mockServer.close()
})

test('location service must track a location for given connection| ESW-308', async () => {
  const expectedTrackingEvent: LocationUpdated = {
    _type: 'LocationUpdated',
    location: httpLocation
  }
  await wsMockWithResolved(expectedTrackingEvent, mockServer)

  locationService.track(httpConnection, (trackingEvent) => {
    expect(trackingEvent).toEqual(expectedTrackingEvent)
  })
})
