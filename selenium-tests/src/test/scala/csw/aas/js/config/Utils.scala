package csw.aas.js.config

import java.io.File

import org.apache.pekko.http.scaladsl.Http
import org.apache.pekko.http.scaladsl.Http.ServerBinding

import scala.concurrent.duration.{DurationDouble, FiniteDuration}
import scala.concurrent.{Await, Future}

object Utils {

  val defaultTimeout: FiniteDuration = 10.minutes

  def await[T](f: Future[T]): T = Await.result(f, defaultTimeout)

  def terminateHttpServerBinding(binding: ServerBinding): Http.HttpTerminated = await(binding.terminate(defaultTimeout))

  /**
   * Deletes the contents of the given directory (recursively).
   * This is meant for use by tests that need to always start with an empty Svn repository.
   */
  def deleteDirectoryRecursively(dir: File): Unit = {
    // just to be safe, don't delete anything that is not in /tmp/
    val p = dir.getPath
    if (!p.startsWith("/tmp/"))
      throw new RuntimeException(s"Refusing to delete $dir since not in /tmp/")

    if (dir.isDirectory) {
      dir.list.foreach { filePath =>
        val file = new File(dir, filePath)
        if (file.isDirectory) deleteDirectoryRecursively(file)
        else file.delete()
      }
      dir.delete()
    }
  }

}
