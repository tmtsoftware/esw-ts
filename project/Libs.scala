import sbt._

object Libs {
  val ScalaVersion = "3.4.2"

  val `scalaTest`         = "org.scalatest"                            %% "scalatest"         % "3.2.18" // Apache License 2.0
  val `selenium-java`     = "org.seleniumhq.selenium"                   % "selenium-java"     % "4.21.0"
  val `embedded-keycloak` = "com.github.tmtsoftware.embedded-keycloak" %% "embedded-keycloak" % "3c23339"
  val `webdriverManager`  = "io.github.bonigarcia"                      % "webdrivermanager"  % "5.8.0"
  val `tmt-test-reporter` = "com.github.tmtsoftware.rtm"               %% "rtm"               % "1981053"
  val scalaTestPlus       = "org.scalatestplus"                        %% "selenium-4-9"      % "3.2.16.0"
}

object ESW {
  private val defaultESWVersion = "71204a6"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("ESW_VERSION", defaultESWVersion)
    case _            => "0.1.0-SNAPSHOT"
  }
}

object CSW {
  private val defaultCswVersion = "bf746b7"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("CSW_VERSION", defaultCswVersion)
    case _            => "0.1.0-SNAPSHOT"
  }

  val `csw-location-server` = "com.github.tmtsoftware.csw" %% "csw-location-server" % Version
  val `csw-config-server`   = "com.github.tmtsoftware.csw" %% "csw-config-server"   % Version
}
