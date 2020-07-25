package csw.aas.js.config

import org.tmt.embedded_keycloak.KeycloakData.{ApplicationUser, Client, Realm}
import org.tmt.embedded_keycloak.impl.StopHandle
import org.tmt.embedded_keycloak.{EmbeddedKeycloak, KeycloakData, Settings => KeycloakSettings}

import scala.concurrent.duration.{DurationLong, FiniteDuration}
import scala.concurrent.{Await, ExecutionContext}

object Keycloak {

  val configUserName = "config-admin"
  val configPassword = "config-admin"

  val exampleUserName = "dummy-user"
  val examplePassword = "dummy-user"

  private val serverTimeout: FiniteDuration = 30.minutes

  def start()(implicit ec: ExecutionContext): (EmbeddedKeycloak, StopHandle) = {

    val `tmt-frontend-app` =
      Client("tmt-frontend-app", "public", passwordGrantEnabled = false, implicitFlowEnabled = true, authorizationEnabled = false)

    val configRole       = "config-admin"
    val personRole       = "person-role"
    val exampleAdminRole = "example-admin-role"

    val configUser = ApplicationUser(
      configUserName,
      configPassword,
      realmRoles = Set(configRole)
    )

    val exampleUser = ApplicationUser(
      exampleUserName,
      examplePassword,
      realmRoles = Set(personRole, exampleAdminRole)
    )

    val embeddedKeycloak = new EmbeddedKeycloak(
      KeycloakData(
        realms = Set(
          Realm(
            "TMT",
            realmRoles = Set(configRole, personRole, exampleAdminRole),
            clients = Set(`tmt-frontend-app`),
            users = Set(configUser, exampleUser)
          )
        )
      ),
      KeycloakSettings.default.copy(keycloakDirectory = System.getProperty("user.home") + "/.keycloak/embedded-keycloak")
    )
    val stopHandle = Await.result(embeddedKeycloak.startServer(), serverTimeout)

    (embeddedKeycloak, stopHandle)
  }
}
