package org.tmt

import java.nio.file.{Path, Paths}

import caseapp.core.argparser.SimpleArgParser
import caseapp.{ExtraName, HelpMessage, _}
import csw.testkit.scaladsl.CSWService.{AlarmServer, ConfigServer, EventServer, LocationServer}
import esw.ocs.testkit.Service
import esw.ocs.testkit.Service.{Gateway, WrappedCSWService}

sealed trait TSServicesCommands
object TSServicesCommands {
  private lazy val getCommandRolesPath =
    Paths.get("tmt-backend", "src", "main", "resources").resolve("commandRoles.conf").toAbsolutePath

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
      @HelpMessage("path to command role from root directory")
      @ExtraName("r")
      commandRoles: Path = getCommandRolesPath
  ) extends TSServicesCommands
}
