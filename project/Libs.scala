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
  private val defaultESWVersion = "0.3.0-RC2"

  val Version: Option[String] = sys.props.get("prod.publish").collect {
    case "true" =>
      val env = sys.env ++ sys.props
      env.getOrElse("ESW_VERSION", defaultESWVersion)
  }
}

object CSW {
  private val defaultCswVersion = "4.0.0-RC2"

  val Version: Option[String] = sys.props.get("prod.publish").collect {
    case "true" =>
      val env = sys.env ++ sys.props
      env.getOrElse("CSW_VERSION", defaultCswVersion)
  }

  private val _version      = Version.getOrElse(defaultCswVersion)
  val `csw-location-server` = "com.github.tmtsoftware.csw" %% "csw-location-server" % _version
  val `csw-config-server`   = "com.github.tmtsoftware.csw" %% "csw-config-server"   % _version
}
