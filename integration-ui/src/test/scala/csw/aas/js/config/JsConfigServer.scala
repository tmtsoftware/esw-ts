package csw.aas.js.config
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.{HttpRequest, StatusCodes}
import akka.stream.Materializer
import akka.stream.scaladsl.{RestartSource, Sink, Source}
import os.Inherit

import scala.concurrent.duration.DurationDouble
import scala.concurrent.{ExecutionContext, Future}

case class StreamFailedAfterMaxRetriesException(msg: String) extends Exception(msg)

trait JsConfigServer {

  private val jsDir        = os.pwd / os.up / "example"
  private val configScript = jsDir / "config.sh"

  def startNodeConfigServer()(implicit actorSystem: ActorSystem, ec: ExecutionContext, mat: Materializer): Future[Boolean] =
    if (run("start")) healthCheck("http://localhost:5000")
    else Future.successful(false)

  def stopNodeConfigServer(): Boolean = run("stop")

  private def run(cmd: String) =
    os.proc("sh", configScript, cmd)
      .call(stdout = Inherit)
      .exitCode == 0

  private def healthCheck(
      url: String
  )(implicit actorSystem: ActorSystem, ec: ExecutionContext, mat: Materializer): Future[Boolean] =
    RestartSource
      .withBackoff(
        minBackoff = 100.millis,
        maxBackoff = 5.seconds,
        randomFactor = 0.2,
        maxRestarts = 20
      ) { () =>
        val statusF = Http().singleRequest(HttpRequest(uri = url)).map(_.status)
        Source
          .future(statusF)
          .collect { case StatusCodes.OK => println(s"==== Server is up at: [$url] ===="); true }
          .recover { case x => println("RETRY: probing config node server"); throw x }
      }
      .runWith(Sink.head)
      .recover { case _ => throw StreamFailedAfterMaxRetriesException(s"could not connect to: [$url]") }

}
