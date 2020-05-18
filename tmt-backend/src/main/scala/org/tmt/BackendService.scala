package org.tmt

import java.nio.file.Path

import caseapp.RemainingArgs
import esw.http.core.commons.EswCommandApp
import esw.ocs.testkit.Service.Gateway
import esw.ocs.testkit.{EswTestKit, Service}
import org.tmt.TSServicesCommands._

object BackendService extends EswCommandApp[TSServicesCommands] {

  private val eswTestKit: EswTestKit = new EswTestKit() {}

  import eswTestKit._

  def startServices(services: List[Service], commandRoles: Path): Unit = {
    frameworkTestKit.start(Service.convertToCsw(services): _*)
    if (services.contains(Gateway)) spawnGateway(commandRoles)
  }

  override def run(options: TSServicesCommands, remainingArgs: RemainingArgs): Unit = {
    options match {
      case StartServices(services, commandRoles) => startServices(services, commandRoles)
    }
  }

  override def exit(code: Int): Nothing = {
    eswTestKit.afterAll()
    super.exit(code)
  }
}
