import { Builder } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

export const setupBrowser = async () => {
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('window-size=1920x1080').headless())
    .build()
}
