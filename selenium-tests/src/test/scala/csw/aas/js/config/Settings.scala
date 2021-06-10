package csw.aas.js.config

import com.typesafe.config.ConfigFactory

object Settings {

  private val config         = ConfigFactory.load()
  private val seleniumConfig = config.getConfig("selenium")

  val Headless: Boolean = seleniumConfig.getBoolean("headless")
}
