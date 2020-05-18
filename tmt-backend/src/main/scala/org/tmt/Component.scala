package org.tmt

import caseapp.core.RemainingArgs
import com.typesafe.config.ConfigFactory
import esw.http.core.commons.EswCommandApp
import esw.ocs.testkit.EswTestKit
import org.tmt.TSComponentCommands.StartComponent

object Component extends EswCommandApp[TSComponentCommands] {
  private def config(name: String) = ConfigFactory.parseResources(name)

  private val eswTestKit: EswTestKit = new EswTestKit() {}

  import eswTestKit._

  override def run(options: TSComponentCommands, remainingArgs: RemainingArgs): Unit = {
    options match {
      case StartComponent(conf) => frameworkTestKit.spawnStandalone(config(conf))
    }
  }
}
