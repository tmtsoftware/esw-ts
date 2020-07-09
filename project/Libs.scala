import org.portablescala.sbtplatformdeps.PlatformDepsPlugin.autoImport._
import sbt.Def.{setting => dep}
import sbt._

object Libs {
  val ScalaVersion = "2.13.2"

  val `scalaTest`         = "org.scalatest"                            %% "scalatest"         % "3.0.8" //Apache License 2.0
  val `selenium-java`     = "org.seleniumhq.selenium"                   % "selenium-java"     % "3.141.59"
  val `embedded-keycloak` = "com.github.tmtsoftware.embedded-keycloak" %% "embedded-keycloak" % "9374d69"
  val `webdriverManager`  = "io.github.bonigarcia"                      % "webdrivermanager"  % "4.0.0"
  val `tmt-test-reporter` = "com.github.tmtsoftware"                   %% "rtm"               % "05e9789f460"
  val scalaTestPlus       = "org.scalatestplus"                        %% "selenium-3-141"    % "3.2.0.0"
}

object CSW {
  val Version: String = {
    val env = sys.env ++ sys.props
    env.getOrElse("CSW_VERSION", "master-SNAPSHOT")
  }

  val `csw-location-server` = "com.github.tmtsoftware.csw" %% "csw-location-server" % Version
  val `csw-config-server`   = "com.github.tmtsoftware.csw" %% "csw-config-server"   % Version
}

object React4s {
  val `react4s`  = dep("com.github.ahnfelt" %%% "react4s" % "0.9.24-SNAPSHOT")
  val `router4s` = dep("com.github.werk" %%% "router4s" % "0.1.0-SNAPSHOT")
}
