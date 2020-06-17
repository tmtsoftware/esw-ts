package csw.aas.js.config.pages

import org.openqa.selenium.WebDriver
import org.scalatestplus.selenium.WebBrowser

class LoginPage(implicit driver: WebDriver) extends WebBrowser {

  private val usernameTxt = id("username")
  private val passwordTxt = id("password")
  private val kcLoginBtn  = id("kc-login")

  def login(userName: String, password: String): ConfigAdminPage = {
    textField(usernameTxt).value = userName
    pwdField(passwordTxt).value = password
    click on kcLoginBtn

    new ConfigAdminPage
  }

}
