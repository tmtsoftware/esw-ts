package csw.aas.js.config
import csw.aas.js.config.pages.HomePage

class AasJsIntegrationTest extends BaseTestSuite {

  // DEOPSCSW-656: SPIKE: Spike out selenium and cucumber test for testing integration between
  // AAS-JS - Keycloak - Location Service - AkkaHttpServer
  test("should create config file through config admin UI | ESW-330") {
    val homePage = new HomePage
    go to homePage
    homePage
      .clickOnLoginBtn()
      .login(Keycloak.configUser, Keycloak.configPassword)
      .createConfig("test", "Sample file content.")
      .outputText shouldBe "1"
  }
}
