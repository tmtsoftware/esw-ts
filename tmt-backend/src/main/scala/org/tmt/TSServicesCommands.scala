package org.tmt

import java.nio.file.{Path, Paths}

import caseapp.core.Error.UnrecognizedArgument
import caseapp.core.argparser.SimpleArgParser
import caseapp.{ExtraName, HelpMessage, _}
import csw.testkit.scaladsl.CSWService.{AlarmServer, ConfigServer, EventServer, LocationServer}
import esw.ocs.testkit.Service
import esw.ocs.testkit.Service.Gateway

sealed trait TSServicesCommands
object TSServicesCommands {

  private lazy val commandRolesPath = Paths.get("tmt-backend/src/main/resources/commandRoles.conf").toAbsolutePath

  implicit val serviceParser: SimpleArgParser[Service] = {
    SimpleArgParser.from[Service]("service") {
      case "Location" => Right(LocationServer)
      case "Event"    => Right(EventServer)
      case "Alarm"    => Right(AlarmServer)
      case "Config"   => Right(ConfigServer)
      case "Gateway"  => Right(Gateway)
      case unknown    => Left(UnrecognizedArgument(unknown))
    }
  }

  @CommandName("start")
  final case class Start(
      @HelpMessage("Service name e.g., Location, Gateway etc")
      @ExtraName("s")
      services: List[Service],
      @HelpMessage("path to command role from root directory")
      @ExtraName("r")
      commandRoles: Path = commandRolesPath
  ) extends TSServicesCommands
}
