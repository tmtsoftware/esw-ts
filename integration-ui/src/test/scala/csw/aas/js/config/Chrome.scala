package csw.aas.js.config
import io.github.bonigarcia.wdm.WebDriverManager
import org.openqa.selenium.chrome.{ChromeDriver, ChromeOptions}
import org.scalatestplus.selenium.{Driver, WebBrowser}

trait Chrome extends WebBrowser with Driver {
  import Settings._

  implicit lazy val webDriver: ChromeDriver = {
    WebDriverManager.chromedriver().setup()

    val chromeOptions = new ChromeOptions()
      .setHeadless(Headless)
      .addArguments("--window-size=1920,1080") // this is required in headless mode
      .addArguments("--start-maximized")
      .addArguments("--no-sandbox")
    new ChromeDriver(chromeOptions)
  }

}
