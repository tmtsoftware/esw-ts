import { AlarmKey, AlarmService } from '../../src/clients/alarm'
import { CommandService } from '../../src/clients/command'
import { Done } from '../../src/clients/location'
import { SequencerService } from '../../src/clients/sequencer'
import { ComponentId, Prefix, Setup } from '../../src/models'
import { getToken } from '../utils/auth'
import {
  startComponent,
  startConfigApp,
  startSequencer,
  startServices,
  stopConfigApp,
  stopServices
} from '../utils/backend'
import { By, until, WebDriver } from 'selenium-webdriver'
import 'chromedriver'
import { setupBrowser } from '../utils/browser'
import { delay } from '../utils/eventually'

jest.setTimeout(1000000)
const hcdPrefix = new Prefix('IRIS', 'testHcd')
const componentId = new ComponentId(hcdPrefix, 'HCD')

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['AAS', 'Gateway', 'Alarm'])
  // setup test hcd
  await startComponent(hcdPrefix, 'HCD', 'testHcd.conf')
  await startSequencer('ESW', 'MoonNight')
  // start example app for auth flow
  await startConfigApp()
  // todo use eventually here
  await delay(10000)
})

afterAll(async () => {
  await stopServices()
  await stopConfigApp()
})

describe('Command Client', () => {
  test('should get accepted response on oneway command', async () => {
    const validToken: string = await getToken(
      'esw-gateway-client',
      'gateway-user1',
      'gateway-user1',
      'TMT-test'
    )

    const commandService = new CommandService(componentId, () => validToken)
    const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])
    const actualResponse = await commandService.oneway(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })

  test('should get unauthorised error on sending invalid token', async () => {
    const commandService = new CommandService(componentId, () => '')
    const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])

    await expect(commandService.oneway(setupCommand)).rejects.toThrow(Error('Unauthorized'))
  })

  test('should get forbidden error on sending command to different subsystem', async () => {
    const tokenWithoutRole: string = await getToken(
      'esw-gateway-client',
      'gateway-user2',
      'gateway-user2',
      'TMT-test'
    )

    const commandService = new CommandService(componentId, () => tokenWithoutRole)
    const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])

    await expect(commandService.oneway(setupCommand)).rejects.toThrow(Error('Forbidden'))
  })
})

describe('Alarm Client', () => {
  const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
  test('set severity for the given component', async () => {
    const alarmService = new AlarmService()
    const alarmKey = new AlarmKey(trombonePrefix, 'tromboneAxisHighLimitAlarm')

    const response: Done = await alarmService.setSeverity(alarmKey, 'Okay')

    expect(response).toEqual('Done')
  })
})

describe('Sequencer Client', () => {
  test('is up and available', async () => {
    const validToken: string = await getToken(
      'esw-gateway-client',
      'gateway-user1',
      'gateway-user1',
      'TMT-test'
    )

    const sequencerService = new SequencerService(
      new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer'),
      () => validToken
    )

    const available = await sequencerService.isAvailable()

    expect(available).toBeTruthy()
  })

  test('should get unauthorized error when invalid token is provided', async () => {
    const sequencerService = new SequencerService(
      new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer'),
      () => undefined
    )

    await expect(() => sequencerService.goOffline()).rejects.toThrow('Unauthorized')
  })
})

describe('Login page', () => {
  test('should successfully authenticate on login with valid username and password', async () => {
    const browser = await setupBrowser()
    try {
      await browser.get('http://localhost:3000/')

      await clickLoginOnAasResolve(browser)
      await enterCredentialsAndLogin(browser)

      await browser.wait(until.elementLocated(By.id('create-config-btn')), 2000)
      const createConfigButton = browser.findElement(By.id('create-config-btn'))
      expect(await createConfigButton.isDisplayed()).toBeTruthy()
    } finally {
      await browser.quit()
    }
  })
  const enterCredentialsAndLogin = async (browser: WebDriver) => {
    await browser.wait(until.elementLocated(By.id('username')), 5000)
    await browser.executeScript(
      "document.getElementById('username').setAttribute('value', 'gateway-user1')"
    )
    await browser.executeScript(
      "document.getElementById('password').setAttribute('value', 'gateway-user1')"
    )
    const element2 = browser.findElement(By.id('kc-login'))
    return element2.click()
  }

  const clickLoginOnAasResolve = async (browser: WebDriver) => {
    const loginButton = By.id('aas-login')

    await browser.wait(until.elementLocated(loginButton), 5000)
    const loginElement = browser.findElement(loginButton)
    await loginElement.click()
  }
})
