package csw.aas.js.config.pages

import org.openqa.selenium.WebDriver
import org.scalatestplus.selenium.{Page, WebBrowser}

class HomePage(implicit driver: WebDriver) extends WebBrowser with Page {

  override val url: String = "http://127.0.0.1:3000/"

  private val aasLoginBtn = id("keycloak-login")

  def clickOnLoginBtn(): LoginPage = {
    click on aasLoginBtn
    new LoginPage
  }
}
