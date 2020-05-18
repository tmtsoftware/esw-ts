package org.tmt

import java.nio.file.Path

import akka.actor.CoordinatedShutdown
import caseapp.RemainingArgs
import csw.logging.client.scaladsl.LoggingSystemFactory
import csw.network.utils.Networks
import esw.http.core.commons.EswCommandApp
import esw.ocs.testkit.Service.Gateway
import esw.ocs.testkit.{EswTestKit, Service}
import org.tmt.TSServicesCommands._

import scala.util.control.NonFatal

object BackendService extends EswCommandApp[TSServicesCommands] {
  override def appName: String  = getClass.getSimpleName.dropRight(1) // remove $ from class name
  override def progName: String = "tmt-backend"

  private lazy val eswTestKit: EswTestKit = new EswTestKit() {}
  import eswTestKit._

  override def run(options: TSServicesCommands, remainingArgs: RemainingArgs): Unit =
    options match {
      case Start(services, commandRoles) => run(services, commandRoles)
    }

  private def run(services: List[Service], commandRoles: Path): Unit =
    try {
      LoggingSystemFactory.start(progName, "0.1.0-SNAPSHOT", Networks().hostname, actorSystem)
      startServices(services, commandRoles)
      CoordinatedShutdown(actorSystem).addJvmShutdownHook(shutdown())
    }
    catch {
      case NonFatal(e) => shutdown(); throw e
    }

  private def startServices(services: List[Service], commandRoles: Path): Unit = {
    frameworkTestKit.start(Service.convertToCsw(services): _*)
    if (services.contains(Gateway)) spawnGateway(commandRoles)
  }

  private def shutdown(): Unit = eswTestKit.afterAll()
}
