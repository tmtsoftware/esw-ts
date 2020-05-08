package org.tmt

import esw.gateway.server.GatewayMain
import java.nio.file.Paths
import csw.services.cli.Command
import csw.services.internal.Wiring
import csw.services.utils.ColoredConsole
import csw.logging.client.scaladsl.LoggingSystemFactory
import akka.actor.CoordinatedShutdown
import scala.util.control.NonFatal

object Backend extends App {

  val start  = Command.Start(auth = true)
  val wiring = new Wiring(start)
  import wiring._
  try {
    prettyPrint("Starting CSW Services ...")
    environment.setup()
    LoggingSystemFactory.start("CSW-SERVICES", "0.1.0", settings.hostName, actorSystem)
    serviceList.foreach(_.start)
    CoordinatedShutdown(actorSystem).addJvmShutdownHook(shutdown())
    prettyPrint("Started CSW Services!")

    prettyPrint("Starting Gateway Server ...")
    GatewayMain.start(None, local = true, Paths.get(""), metricsEnabled = false, startLogging = true)
    prettyPrint("Started Gateway Server!")
  }
  catch {
    case NonFatal(e) =>
      e.printStackTrace()
      shutdown()
      System.exit(1)
  }

  def prettyPrint(msg: String): Unit = {
    println("-" * 80)
    ColoredConsole.GREEN.println(msg)
    println("-" * 80)
  }

}
