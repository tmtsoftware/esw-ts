package csw.aas.js.config
import org.apache.pekko.actor.typed.ActorSystem
import org.apache.pekko.actor.typed.scaladsl.Behaviors
import org.apache.pekko.http.scaladsl.Http
import org.apache.pekko.stream.scaladsl.{RestartSource, Sink, Source}
import org.apache.pekko.stream.{Materializer, RestartSettings}
import os.Inherit

import scala.concurrent.duration.DurationDouble
import scala.concurrent.{ExecutionContext, Future}

case class StreamFailedAfterMaxRetriesException(msg: String) extends Exception(msg)

trait JsConfigServer {

  private val jsDir        = os.pwd / os.up / "example"
  private val configScript = jsDir / "config.sh"

  def startNodeConfigServer()(implicit ec: ExecutionContext, mat: Materializer): Future[Boolean] = {
    implicit val system: ActorSystem[Any] = ActorSystem(Behaviors.empty, "SingleRequest")
    if (run("start")) healthCheck("http://localhost:3000/")
    else Future.successful(false)
  }

  def stopNodeConfigServer(): Boolean = run("stop")

  private def run(cmd: String) =
    os.proc("sh", configScript, cmd)
      .call(stdout = Inherit)
      .exitCode == 0

  private def healthCheck(
      url: String
  )(implicit system: ActorSystem[Any], ec: ExecutionContext, mat: Materializer): Future[Boolean] = {
    import org.apache.pekko.http.scaladsl.client.RequestBuilding.Get
    RestartSource
      .withBackoff(
        RestartSettings(minBackoff = 100.millis, maxBackoff = 500.millis, randomFactor = 0.2)
          .withMaxRestarts(count = 20, 10.seconds)
      ) { () =>
        val statusF = Http().singleRequest(Get(url)).map(_.status.intValue)
        Source
          .future(statusF)
          .collect { case 200 => println(s"==== Server is up at: [$url] ===="); true }
          .recover { case x => println(s"RETRY: probing config node server"); throw x }
      }
      .runWith(Sink.head)
      .recover { case _ => throw StreamFailedAfterMaxRetriesException(s"could not connect to: [$url]") }
  }

}
