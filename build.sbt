import ohnosequences.sbt.GithubRelease.keys.ghreleaseAssets
import ohnosequences.sbt.SbtGithubReleasePlugin
import org.tmt.sbt.docs.DocKeys._

lazy val aggregatedProjects: Seq[ProjectReference] = Seq(
  `integration-ui`,
  `docs`
)

/* ================= Root Project ============== */
lazy val `esw-ts` = project
  .in(file("."))
  .enablePlugins(SbtGithubReleasePlugin)
  .settings(
    ghreleaseRepoOrg := "tmtsoftware",
    ghreleaseRepoName := "esw-ts",
    ghreleaseAssets := Seq()
  )
  .aggregate(aggregatedProjects: _*)

/* ================= Paradox Docs ============== */
lazy val docs = project
  .enablePlugins(DocsPlugin)
  .disablePlugins(SbtGithubReleasePlugin)
  .settings(
    docsRepo := "https://github.com/tmtsoftware/tmtsoftware.github.io.git",
    docsParentDir := "esw-ts",
    gitCurrentRepo := "https://github.com/tmtsoftware/esw-ts",
    paradoxRoots := List(
      "aas/csw-aas-js.html",
      "clients/admin/admin-service.html",
      "clients/agent/agent-service.html",
      "clients/command/command-service.html",
      "clients/sequencer/sequencer-service.html",
      "clients/location/location-service.html",
      "clients/config/config-service.html",
      "clients/event/event-service.html",
      "index.html",
      "common/error-handling.html",
      "technical/csw-aas-js.html"
    )
  )

lazy val `integration-ui` = project
  .in(file("integration-ui"))
  .settings(
    libraryDependencies ++= Dependencies.Integration.value
  )
  .disablePlugins(SbtGithubReleasePlugin)
