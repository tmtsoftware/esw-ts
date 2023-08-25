package csw.aas.js.config
import org.apache.pekko.stream.scaladsl.{RestartSource, Sink, Source}
import org.apache.pekko.stream.{Materializer, RestartSettings}
import os.Inherit

import scala.concurrent.duration.DurationDouble
import scala.concurrent.{ExecutionContext, Future}

case class StreamFailedAfterMaxRetriesException(msg: String) extends Exception(msg)

trait JsConfigServer {

  private val jsDir        = os.pwd / os.up / "example"
  private val configScript = jsDir / "config.sh"

  def startNodeConfigServer()(implicit ec: ExecutionContext, mat: Materializer): Future[Boolean] =
    if (run("start")) healthCheck("http://localhost:3000/")
    else Future.successful(false)

  def stopNodeConfigServer(): Boolean = run("stop")

  private def run(cmd: String) =
    os.proc("sh", configScript, cmd)
      .call(stdout = Inherit)
      .exitCode == 0

  private def healthCheck(
      url: String
  )(implicit ec: ExecutionContext, mat: Materializer): Future[Boolean] =
    RestartSource
      .withBackoff(
        RestartSettings(minBackoff = 100.millis, maxBackoff = 500.millis, randomFactor = 0.2)
          .withMaxRestarts(count = 20, 10.seconds)
      ) { () =>
        val statusF: Future[Int] = Future { requests.get(url).statusCode }
        Source
          .future(statusF)
          .collect { case 200 => println(s"==== Server is up at: [$url] ===="); true }
          .recover { case x => println("RETRY: probing config node server"); throw x }
      }
      .runWith(Sink.head)
      .recover { case _ => throw StreamFailedAfterMaxRetriesException(s"could not connect to: [$url]") }

}
