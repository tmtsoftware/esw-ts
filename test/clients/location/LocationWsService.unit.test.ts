import { HttpConnection, Prefix } from '../../../src'
import { LocationServiceImpl } from '../../../src/clients/location/LocationServiceImpl'
import type { LocationHttpMessage } from '../../../src/clients/location/models/PostCommand'
import { LocationWebSocketMessage, Track } from '../../../src/clients/location/models/WsCommand'
import { TrackingEventD } from '../../../src/decoders/LocationDecoders'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { noop, verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = HttpConnection(prefix, 'Sequencer')

const ws: Ws<LocationWebSocketMessage> = new Ws('someUrl')
const mockWs = jest.mocked(ws)

const httpTransport: HttpTransport<LocationHttpMessage> = new HttpTransport('someUrl')
const locationService = new LocationServiceImpl(httpTransport, () => ws)

test('location service must track a location for given connection | ESW-308, ESW-310, ESW-311, ESW-510', () => {
  const callback = noop
  const onError = noop
  const onClose = noop

  locationService.track(httpConnection)(callback, onError, onClose)

  verify(mockWs.subscribe).toBeCalledWith(new Track(httpConnection), callback, TrackingEventD, onError, onClose)
})

afterEach(() => jest.resetAllMocks())
