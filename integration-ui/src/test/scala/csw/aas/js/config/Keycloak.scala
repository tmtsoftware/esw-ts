package csw.aas.js.config

import org.tmt.embedded_keycloak.KeycloakData.{ApplicationUser, Client, ClientRole, Realm}
import org.tmt.embedded_keycloak.impl.StopHandle
import org.tmt.embedded_keycloak.{EmbeddedKeycloak, KeycloakData, Settings => KeycloakSettings}

import scala.concurrent.duration.{DurationLong, FiniteDuration}
import scala.concurrent.{Await, ExecutionContext}

object Keycloak {

  val configUser     = "config-admin"
  val configPassword = "config-admin"

  private val serverTimeout: FiniteDuration = 30.minutes

  def start()(implicit ec: ExecutionContext): (EmbeddedKeycloak, StopHandle) = {
    val configAdmin = "admin"

    val `csw-config-server` = Client(
      "csw-config-server",
      "bearer-only",
      passwordGrantEnabled = false,
      authorizationEnabled = false,
      clientRoles = Set(configAdmin)
    )

    val `csw-config-app` =
      Client("csw-config-app", "public", passwordGrantEnabled = false, implicitFlowEnabled = true, authorizationEnabled = false)

    val embeddedKeycloak = new EmbeddedKeycloak(
      KeycloakData(
        realms = Set(
          Realm(
            "TMT",
            clients = Set(`csw-config-server`, `csw-config-app`),
            users = Set(
              ApplicationUser(
                configUser,
                configPassword,
                clientRoles = Set(ClientRole(`csw-config-server`.name, configAdmin))
              )
            )
          )
        )
      ),
      KeycloakSettings.default.copy(keycloakDirectory = System.getProperty("user.home") + "/.keycloak/embedded-keycloak")
    )
    val stopHandle = Await.result(embeddedKeycloak.startServer(), serverTimeout)

    (embeddedKeycloak, stopHandle)
  }
}
