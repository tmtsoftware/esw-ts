import { Builder, By, until, WebDriver } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

export const setupBrowser = async () => {
  return (
    new Builder()
      .forBrowser('chrome')
      // .setChromeOptions(new chrome.Options().addArguments('window-size=1920x1080').headless())
      .build()
  )
}

export const enterCredentialsAndLogin = async (driver: WebDriver) => {
  await driver.executeScript(
    "document.getElementById('username').setAttribute('value', 'gateway-user1')"
  )
  await driver.executeScript(
    "document.getElementById('password').setAttribute('value', 'gateway-user1')"
  )
  const element2 = driver.findElement(By.id('kc-login'))
  return element2.click()
}

export const clickLoginOnAasResolve = async (driver: WebDriver) => {
  const loginButton = By.id('aas-login')

  await driver.wait(until.elementLocated(loginButton), 5000)
  const loginElement = driver.findElement(loginButton)
  await loginElement.click()
}
