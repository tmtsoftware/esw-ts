package org.tmt

import java.nio.file.Path

import caseapp.RemainingArgs
import com.typesafe.config.ConfigFactory
import csw.logging.client.scaladsl.LoggingSystemFactory
import esw.http.core.commons.EswCommandApp
import esw.ocs.testkit.Service.Gateway
import esw.ocs.testkit.{EswTestKit, Service}
import org.tmt.TSCommands._

object Backend extends EswCommandApp[TSCommands] {

  private def config(name: String) = ConfigFactory.parseResources(name)

  private val eswTestKit: EswTestKit = new EswTestKit() {}

  import eswTestKit._

  def startServices(services: List[Service], commandRoles: Path): Unit = {
    frameworkTestKit.start(Service.convertToCsw(services): _*)
    if (services.contains(Gateway)) spawnGateway(commandRoles)
  }

  override def run(options: TSCommands, remainingArgs: RemainingArgs): Unit = {
    options match {
      case StartServices(services, None, commandRoles)       => startServices(services, commandRoles)
      case StartServices(services, Some(conf), commandRoles) =>
        startServices(services, commandRoles)
        frameworkTestKit.spawnStandalone(config(conf))
    }
  }

  override def exit(code: Int): Nothing = {
    eswTestKit.afterAll()
    super.exit(code)
  }
}
