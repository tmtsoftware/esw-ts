package org.tmt.hcd

import akka.actor.typed.scaladsl.ActorContext
import csw.command.client.messages.TopLevelActorMessage
import csw.framework.models.CswContext
import csw.framework.scaladsl.ComponentHandlers
import csw.location.api.models.TrackingEvent
import csw.params.commands.ControlCommand
import csw.params.core.models.Id
import csw.time.core.models.UTCTime

import scala.concurrent.Future
import csw.params.commands.CommandResponse
import csw.params.commands.CommandResponse.{Accepted, Completed}

class TestHcdHandlers(ctx: ActorContext[TopLevelActorMessage], cswCtx: CswContext) extends ComponentHandlers(ctx, cswCtx) {

  override def initialize(): Future[Unit] = Future.unit

  override def onLocationTrackingEvent(trackingEvent: TrackingEvent): Unit = ???

  override def validateCommand(runId: Id, controlCommand: ControlCommand): CommandResponse.ValidateCommandResponse =
    Accepted(runId)

  override def onSubmit(runId: Id, controlCommand: ControlCommand): CommandResponse.SubmitResponse = Completed(runId)

  override def onOneway(runId: Id, controlCommand: ControlCommand): Unit = {}

  override def onDiagnosticMode(startTime: UTCTime, hint: String): Unit = {}

  override def onOperationsMode(): Unit = ???

  override def onShutdown(): Future[Unit] = ???

  override def onGoOffline(): Unit = ???

  override def onGoOnline(): Unit = ???
}
