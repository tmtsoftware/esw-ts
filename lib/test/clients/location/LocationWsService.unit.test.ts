import { mocked } from 'ts-jest/utils'
import { HttpConnection, TrackingEventD } from '../../../src/clients/location'
import { LocationServiceImpl } from '../../../src/clients/location/LocationServiceImpl'
import type { LocationHttpMessage } from '../../../src/clients/location/models/PostCommand'
import { LocationWebSocketMessage, Track } from '../../../src/clients/location/models/WsCommand'
import { Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/Ws')
jest.mock('../../../src/utils/HttpTransport')

const prefix = new Prefix('ESW', 'MoonNight')
const httpConnection = HttpConnection(prefix, 'Sequencer')

const ws: Ws<LocationWebSocketMessage> = new Ws('someUrl')
const mockWs = mocked(ws)

const httpTransport: HttpTransport<LocationHttpMessage> = new HttpTransport(
  'someUrl',
  () => undefined
)
const locationService = new LocationServiceImpl(httpTransport, () => ws)

test('location service must track a location for given connection | ESW-308, ESW-310, ESW-311', () => {
  const callback = () => ({})

  locationService.track(httpConnection)(callback)

  verify(mockWs.subscribe).toBeCalledWith(new Track(httpConnection), callback, TrackingEventD)
})

afterEach(() => jest.resetAllMocks())
