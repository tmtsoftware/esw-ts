package org.tmt

import csw.testkit.scaladsl.CSWService.{AlarmServer, ConfigServer, EventServer, LocationServer}
import esw.ocs.testkit.Service
import esw.ocs.testkit.Service.{Gateway, WrappedCSWService}

import caseapp._
import caseapp.core.argparser.SimpleArgParser

sealed trait TSCommands
object TSCommands {

  implicit val s: SimpleArgParser[Service] = {
    SimpleArgParser.from[Service]("service") {
      case "Location" => Right(WrappedCSWService(LocationServer))
      case "Gateway"  => Right(Gateway)
      case "Event"    => Right(WrappedCSWService(EventServer))
      case "Alarm"    => Right(WrappedCSWService(AlarmServer))
      case "Config"   => Right(WrappedCSWService(ConfigServer))
    }
  }

  @CommandName("startServices")
  final case class StartServices(
      @HelpMessage("Service name e.g., Location, Gateway etc")
      @ExtraName("s")
      services: List[Service],
      @HelpMessage("Config(contains prefix, componentType, handler etc) name to start component e.g. testHCD.conf")
      @ExtraName("c")
      conf: Option[String]
  ) extends TSCommands
}
