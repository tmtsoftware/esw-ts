import Common.CommonSettings
import org.tmt.sbt.docs.Settings

inThisBuild(
  CommonSettings
)

lazy val aggregatedProjects: Seq[ProjectReference] = Seq(
  `integration-ui`,
  `docs`
)

/* ================= Root Project ============== */
lazy val `esw-ts` = project
  .in(file("."))
  .enablePlugins(GithubPublishPlugin)
  .aggregate(aggregatedProjects: _*)
  .settings(Settings.makeSiteMappings(docs))

/* ================= Paradox Docs ============== */
lazy val docs = project
  .enablePlugins(ParadoxMaterialSitePlugin)
  .settings(
    paradoxProperties ++= Map(
      "extref.esw.base_url" -> s"https://tmtsoftware.github.io/esw/%s"
    ),
    paradoxRoots := List(
      "index.html",
      "common/error-handling.html"
    )
  )

lazy val `integration-ui` = project
  .in(file("integration-ui"))
  .settings(
    libraryDependencies ++= Dependencies.Integration.value
  )
