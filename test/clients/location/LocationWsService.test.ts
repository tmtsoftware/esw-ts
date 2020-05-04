import { HttpConnection, HttpLocation, LocationService, LocationUpdated } from 'clients/location'
import { Server } from 'mock-socket'
import { Prefix } from 'models'
import { wsMockWithResolved } from 'utils/MockHelpers'

let mockServer: Server
const uri = 'http://someuri'
const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = new HttpConnection(prefix, 'Sequencer')
const httpLocation = new HttpLocation(httpConnection, uri)

const locationService = new LocationService()

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
