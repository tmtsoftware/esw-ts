import sbt._

object Libs {
  val ScalaVersion = "2.13.6"

  val `scalaTest`         = "org.scalatest"                            %% "scalatest"         % "3.2.9" //Apache License 2.0
  val `selenium-java`     = "org.seleniumhq.selenium"                   % "selenium-java"     % "3.141.59"
  val `embedded-keycloak` = "com.github.tmtsoftware.embedded-keycloak" %% "embedded-keycloak" % "0.5.0"
  val `webdriverManager`  = "io.github.bonigarcia"                      % "webdrivermanager"  % "4.4.3"
  val `tmt-test-reporter` = "com.github.tmtsoftware"                   %% "rtm"               % "0.2.0"
  val scalaTestPlus       = "org.scalatestplus"                        %% "selenium-3-141"    % "3.2.9.0"
}

object ESW {
  private val defaultESWVersion = "cd601b9"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("ESW_VERSION", defaultESWVersion)
    case _            => "0.1.0-SNAPSHOT"
  }
}

object CSW {
  private val defaultCswVersion = "bad08b0"

  val Version: String = sys.props.get("prod.publish") match {
    case Some("true") => sys.env.getOrElse("CSW_VERSION", defaultCswVersion)
    case _            => "0.1.0-SNAPSHOT"
  }

  val `csw-location-server` = "com.github.tmtsoftware.csw" %% "csw-location-server" % Version
  val `csw-config-server`   = "com.github.tmtsoftware.csw" %% "csw-config-server"   % Version
}
