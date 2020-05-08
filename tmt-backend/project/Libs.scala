import sbt._

object Libs {
  val ScalaVersion = "2.13.2"

  val `scalatest` = "org.scalatest" %% "scalatest" % "3.1.1" //Apache License 2.0
}

object AkkaHttp {
  private val Version = "10.2.0-M1" //all akka is Apache License 2.0

  val `akka-http-spray-json` = "com.typesafe.akka" %% "akka-http-spray-json" % Version
}

object CSW {
  val Version: String = "321cc9b"

  val `csw-framework` = "com.github.tmtsoftware.csw" %% "csw-framework" % Version
  val `csw-services`  = "com.github.tmtsoftware.csw" %% "csw-services"  % Version
}

object ESW {
  val Version: String = "e1a7f43"

  val `esw-gateway-server` = "com.github.tmtsoftware.esw" %% "esw-gateway-server" % Version
}
