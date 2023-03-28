package csw.aas.js.config.pages

import org.openqa.selenium.WebDriver
import org.openqa.selenium.support.ui.WebDriverWait
import org.scalatestplus.selenium.WebBrowser

import java.time.Duration

class ConfigAdminPage(implicit driver: WebDriver) extends WebBrowser {

  private val filePathTxt        = id("file-path-txt-area")
  private val fileContentTxt     = id("file-content-txt-area")
  private val createConfigBtn    = id("create-config-btn")
  private val createConfigOutput = id("create-config-output")
  private val configLink         = id("config-link")

  def createConfig(filePath: String, fileContent: String): ConfigAdminPage = {
    click on configLink
    textArea(filePathTxt).value = filePath
    textArea(fileContentTxt).value = fileContent
    click on createConfigBtn
    this
  }

  def outputText: String = {
    new WebDriverWait(driver, Duration.ofSeconds(10))
      .until[Boolean](_ => find(createConfigOutput).map(_.text).exists(_.length != 0))

    find(createConfigOutput).map(_.text).getOrElse("")
  }
}
