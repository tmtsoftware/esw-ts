import 'whatwg-fetch'
import {
  AkkaConnection,
  GATEWAY_CONNECTION,
  HttpConnection,
  LocationRemoved,
  LocationService,
  Option,
  Prefix,
  setAppConfigPath,
  TrackingEvent
} from '../../src'
import { APP_CONFIG_PATH } from '../../src/config/AppConfigPath'
import { LocationConfigWithAuth } from '../../test/helpers/LocationConfigWithAuth'
import { startComponent, startServices, stopServices } from '../utils/backend'
import { publicIPv4Address } from '../utils/networkUtils'

jest.setTimeout(100000)

const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH
const hcdPrefix = new Prefix('IRIS', 'testHcd')
let locationServiceWithToken: LocationService
let locationServiceWithInvalidToken: LocationService
let locationService: LocationService

const getValueFromOption = <T>(value: Option<T>): T => {
  if (value === undefined) throw new Error('value is undefined')
  return value
}

const akkaHcdConnection: AkkaConnection = {
  prefix: hcdPrefix,
  componentType: 'HCD',
  connectionType: 'akka'
}

const httpHcdConnection: HttpConnection = {
  prefix: hcdPrefix,
  componentType: 'HCD',
  connectionType: 'http'
}

//TODO handle public location service with Auth
beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  setAppConfigPath('../../test/assets/appconfig/AppConfig.ts')
  // setup location service and gateway
  await startServices(['Gateway', 'LocationWithAuth'])
  await startComponent(hcdPrefix, 'HCD', 'testHcd.conf')
  //Following 2 client connects to auth enabled location server instance
  locationServiceWithToken = LocationService(
    { tokenFactory: () => 'validToken' },
    LocationConfigWithAuth
  )
  locationServiceWithInvalidToken = LocationService(undefined, LocationConfigWithAuth)
  //Following 1 client connects to auth disabled location server instance
  locationService = LocationService()
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
  setAppConfigPath(OLD_APP_CONFIG_PATH)
})

describe('LocationService', () => {
  test('should be able to resolve a location for given connection | ESW-343, ESW-308', async () => {
    const gatewayLocation = getValueFromOption(
      await locationService.resolve(GATEWAY_CONNECTION, 10, 'seconds')
    )
    expect(gatewayLocation._type).toBe('HttpLocation')
  })

  test('should be able to list all the registered location | ESW-343, ESW-308', async () => {
    const locations = await locationService.list()

    expect(locations.length).toBe(3)

    const allExpectedConnections = [GATEWAY_CONNECTION, httpHcdConnection, akkaHcdConnection]
    const allExpectedTypes = ['AkkaLocation', 'HttpLocation']

    locations.forEach((loc) => {
      expect(allExpectedTypes).toContainEqual(loc._type)
      expect(allExpectedConnections).toContainEqual(loc.connection)
      expect(loc).toHaveProperty('uri')
    })
  })

  test('should be able to list all the registered location for given componentType | ESW-343, ESW-308', async () => {
    const locations = await locationService.listByComponentType('Service')
    const allExpectedConnections = [GATEWAY_CONNECTION]

    const allExpectedTypes = ['HttpLocation']

    expect(locations.length).toBe(1)
    locations.forEach((loc) => {
      expect(allExpectedTypes).toContainEqual(loc._type)
      expect(allExpectedConnections).toContainEqual(loc.connection)
      expect(loc).toHaveProperty('uri')
    })
  })

  test('should be able to list all the registered location for given connectionType | ESW-343, ESW-308', async () => {
    const locations = await locationService.listByConnectionType('akka')

    expect(locations.length).toBe(1)
    expect(locations[0].connection).toEqual(akkaHcdConnection)
  })

  test('should be able to list all the registered location for given prefix | ESW-343, ESW-308', async () => {
    const locations = await locationService.listByPrefix(hcdPrefix)

    expect(locations.length).toBe(2)
    expect(locations.map((x) => x.connection)).toContainEqual(akkaHcdConnection)
    expect(locations.map((x) => x.connection)).toContainEqual(httpHcdConnection)
  })

  test('should be able to list all the registered location for given hostname | ESW-343, ESW-308', async () => {
    const locations = await locationService.listByHostname(publicIPv4Address())

    const allExpectedConnections = [GATEWAY_CONNECTION, httpHcdConnection, akkaHcdConnection]
    const allExpectedTypes = ['AkkaLocation', 'HttpLocation']

    expect(locations.length).toBe(3)
    locations.forEach((loc) => {
      expect(allExpectedTypes).toContainEqual(loc._type)
      expect(allExpectedConnections).toContainEqual(loc.connection)
      expect(loc).toHaveProperty('uri')
    })
  })

  test('should be able to find the location of given connection | ESW-343, ESW-308', async () => {
    const location = getValueFromOption(await locationService.find(akkaHcdConnection))
    expect(location._type).toBe('AkkaLocation')
    expect(location.connection).toEqual(akkaHcdConnection)
  })

  test('should be able to track a location from location server | ESW-343, ESW-308', () => {
    return new Promise<void>(async (done) => {
      const expectedTrackingEvent: LocationRemoved = {
        _type: 'LocationRemoved',
        connection: GATEWAY_CONNECTION
      }

      const callBack = (trackingEvent: TrackingEvent) => {
        expect(trackingEvent).toEqual(expectedTrackingEvent)
        done()
      }
      locationService.track(GATEWAY_CONNECTION)(callBack)

      const response = await locationService.unregister(GATEWAY_CONNECTION)
      expect(response).toBe('Done')

      const location = await locationService.find(GATEWAY_CONNECTION)
      expect(location).toBeUndefined()
    })
  })

  test('should be able to unregister a location from location server | ESW-343, ESW-308', async () => {
    const hcdPrefix = new Prefix('WFOS', 'testHcd')
    const connection = HttpConnection(hcdPrefix, 'HCD')
    await startComponent(hcdPrefix, 'HCD', 'wfosHcd.conf')

    const response = await locationServiceWithToken.unregister(connection)
    expect(response).toBe('Done')

    const location = await locationService.find(connection)
    expect(location).toBeUndefined()
  })

  test('should return Unauthorized when unregister called without token to auth protected location service instance | ESW-343, ESW-308', async () => {
    // const location = await locationService.find(httpHcdConnection)
    // expect(location).toBeDefined()
    expect.assertions(4)
    await locationServiceWithInvalidToken.unregister(httpHcdConnection).catch((e) => {
      expect(e.errorType).toBe('TransportError')
      expect(e.status).toBe(401)
      expect(e.message).toBe(
        'The resource requires authentication, which was not supplied with the request'
      )
      expect(e.statusText).toBe('Unauthorized')
    })
  })
})
