package org.tmt

import caseapp.RemainingArgs
import com.typesafe.config.ConfigFactory
import esw.http.core.commons.EswCommandApp
import esw.ocs.testkit.EswTestKit
import org.tmt.TSCommands._

object Backend extends EswCommandApp[TSCommands] {

  def config(name: String) =
    ConfigFactory
      .parseResources(name)

  private var eswTestKit: EswTestKit = null

  override def run(options: TSCommands, remainingArgs: RemainingArgs): Unit = {
    options match {
      case StartServices(services) =>
        println(services)
        eswTestKit = new EswTestKit(services: _*) {}
        eswTestKit.beforeAll()

      case StartComponent(conf) => eswTestKit.frameworkTestKit.spawnStandalone(config(conf))
    }
  }

  override def exit(code: Int): Nothing = {
    eswTestKit.afterAll()
    super.exit(code)
  }
}
