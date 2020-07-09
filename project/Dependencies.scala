import sbt._

object Dependencies {

  val Integration = Def.setting(
    Seq(
      Libs.`scalaTest`          % Test,
      Libs.`selenium-java`      % Test,
      CSW.`csw-location-server` % Test,
      CSW.`csw-config-server`   % Test,
      Libs.`embedded-keycloak`  % Test,
      Libs.`webdriverManager`   % Test,
      Libs.`tmt-test-reporter`  % Test,
      Libs.scalaTestPlus        % Test
    )
  )

}
