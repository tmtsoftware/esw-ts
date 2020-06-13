import { Builder } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'

export const setupBrowser = async () => {
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new Options().addArguments('window-size=1920x1080').headless())
    .build()
}
