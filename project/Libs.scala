import sbt._

object Libs {
  val ScalaVersion = "3.6.2"

  val `scalaTest`         = "org.scalatest"                            %% "scalatest"         % "3.2.19" // Apache License 2.0
  val `selenium-java`     = "org.seleniumhq.selenium"                   % "selenium-java"     % "4.27.0"
  val `embedded-keycloak` = "com.github.tmtsoftware.embedded-keycloak" %% "embedded-keycloak" % "6b52e4e"
  val `webdriverManager`  = "io.github.bonigarcia"                      % "webdrivermanager"  % "5.9.2"
  val `tmt-test-reporter` = "com.github.tmtsoftware.rtm"               %% "rtm"               % "b7997a9"
  val scalaTestPlus       = "org.scalatestplus"                        %% "selenium-4-21"      % "3.2.19.0"
}
object ESW {
  private val defaultESWVersion = "d27789a"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("ESW_VERSION", defaultESWVersion)
    case _            => "0.1.0-SNAPSHOT"
  }
}

object CSW {
  private val defaultCswVersion = "919e345"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("CSW_VERSION", defaultCswVersion)
    case _            => "0.1.0-SNAPSHOT"
  }

  val `csw-location-server` = "com.github.tmtsoftware.csw" %% "csw-location-server" % Version
  val `csw-config-server`   = "com.github.tmtsoftware.csw" %% "csw-config-server"   % Version
}
