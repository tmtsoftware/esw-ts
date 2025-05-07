import sbt._

object Libs {
  val ScalaVersion = "3.6.4"

  val `scalaTest`         = "org.scalatest"                            %% "scalatest"         % "3.2.19" // Apache License 2.0
  val `selenium-java`     = "org.seleniumhq.selenium"                   % "selenium-java"     % "4.29.0"
  val `embedded-keycloak` = "com.github.tmtsoftware.embedded-keycloak" %% "embedded-keycloak" % "0.7.3"
  val `webdriverManager`  = "io.github.bonigarcia"                      % "webdrivermanager"  % "5.9.3"
  val `tmt-test-reporter` = "com.github.tmtsoftware.rtm"               %% "rtm"               % "0.4.0"
  val scalaTestPlus       = "org.scalatestplus"                        %% "selenium-4-21"      % "3.2.19.0"
}
object ESW {
  private val defaultESWVersion = "v1.0.0"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("ESW_VERSION", defaultESWVersion)
    case _            => "0.1.0-SNAPSHOT"
  }
}

object CSW {
  private val defaultCswVersion = "6.0.0-RC4"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("CSW_VERSION", defaultCswVersion)
    case _            => "0.1.0-SNAPSHOT"
  }

  val `csw-location-server` = "com.github.tmtsoftware.csw" %% "csw-location-server" % Version
  val `csw-config-server`   = "com.github.tmtsoftware.csw" %% "csw-config-server"   % Version
}
