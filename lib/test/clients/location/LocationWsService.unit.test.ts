import { HttpConnection, TrackingEvent } from '../../../src/clients/location'
import { Prefix } from '../../../src/models'
import { mockHttpTransport, mockWsTransport } from '../../helpers/MockHelpers'
import { LocationServiceImpl } from '../../../src/clients/location/Impl'
import { Track } from '../../../src/clients/location/models/WsCommand'

const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = HttpConnection(prefix, 'Sequencer')

const mockSubscribe = jest.fn()
const locationService = new LocationServiceImpl(mockHttpTransport(), () =>
  mockWsTransport(mockSubscribe)
)

test('location service must track a location for given connection | ESW-308, ESW-310, ESW-311', () => {
  const callback = () => ({})

  locationService.track(httpConnection)(callback)

  expect(mockSubscribe).toBeCalledWith(new Track(httpConnection), callback, TrackingEvent)
})
