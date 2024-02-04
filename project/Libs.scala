import sbt._

object Libs {
  val ScalaVersion = "3.3.1"

  val `scalaTest`         = "org.scalatest"                            %% "scalatest"         % "3.2.17" // Apache License 2.0
  val `selenium-java`     = "org.seleniumhq.selenium"                   % "selenium-java"     % "4.17.0"
  val `embedded-keycloak` = "com.github.tmtsoftware.embedded-keycloak" %% "embedded-keycloak" % "283ab9a"
  val `webdriverManager`  = "io.github.bonigarcia"                      % "webdrivermanager"  % "5.6.3"
  val `tmt-test-reporter` = "com.github.tmtsoftware.rtm"               %% "rtm"               % "72269ec"
  val scalaTestPlus       = "org.scalatestplus"                        %% "selenium-4-9"      % "3.2.16.0"
}

object ESW {
  private val defaultESWVersion = "42f53c9"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("ESW_VERSION", defaultESWVersion)
    case _            => "0.1.0-SNAPSHOT"
  }
}

object CSW {
  private val defaultCswVersion = "a676eeb"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("CSW_VERSION", defaultCswVersion)
    case _            => "0.1.0-SNAPSHOT"
  }

  val `csw-location-server` = "com.github.tmtsoftware.csw" %% "csw-location-server" % Version
  val `csw-config-server`   = "com.github.tmtsoftware.csw" %% "csw-config-server"   % Version
}
