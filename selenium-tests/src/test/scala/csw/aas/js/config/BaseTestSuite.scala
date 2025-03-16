package csw.aas.js.config

import csw.aas.js.config.Utils.await
import org.scalatest.concurrent.Eventually
import org.scalatest.funsuite.AnyFunSuiteLike
import org.scalatest.matchers.should.Matchers
import org.scalatest.time.SpanSugar.convertFloatToGrainOfTime
import org.scalatest.BeforeAndAfterAll
import org.tmt.embedded_keycloak.impl.StopHandle

import scala.compiletime.uninitialized

trait BaseTestSuite
    extends JsConfigServer
    with CswSetup
    with Chrome
    with AnyFunSuiteLike
    with BeforeAndAfterAll
    with Matchers
    with Eventually {

  private var stopKeycloak: StopHandle = uninitialized

  override protected def beforeAll(): Unit = {
    stopKeycloak = startAndRegisterKeycloak()._2
    startAndRegisterConfigServer()
    if (!await(startNodeConfigServer())) throw new RuntimeException("failed to start js config server")
    implicitlyWait(10.seconds)
  }

  override protected def afterAll(): Unit = {
    stopNodeConfigServer()
    stopKeycloak.stop()
    shutdown()
    quit()
  }

  override implicit def patienceConfig: PatienceConfig = PatienceConfig(10.seconds, 100.millis)
}
