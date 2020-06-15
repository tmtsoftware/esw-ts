import ohnosequences.sbt.GithubRelease.keys.ghreleaseAssets
import ohnosequences.sbt.SbtGithubReleasePlugin
import org.tmt.sbt.docs.DocKeys._

lazy val aggregatedProjects: Seq[ProjectReference] = Seq(
  `integration-ui`,
  `docs`
)

/* ================= Root Project ============== */
lazy val `gateway-tsclient` = project
  .in(file("."))
  .enablePlugins(SbtGithubReleasePlugin)
  .settings(
    ghreleaseRepoOrg := "tmtsoftware",
    ghreleaseRepoName := "gateway-tsclient",
    ghreleaseAssets := Seq()
  )
  .aggregate(aggregatedProjects: _*)

/* ================= Paradox Docs ============== */
lazy val docs = project
  .enablePlugins(DocsPlugin)
  .disablePlugins(SbtGithubReleasePlugin)
  .settings(
    docsRepo := "https://github.com/tmtsoftware/tmtsoftware.github.io.git",
    docsParentDir := "gateway-tsclient",
    gitCurrentRepo := "https://github.com/tmtsoftware/gateway-tsclient"
  )

lazy val `integration-ui` = project
  .in(file("integration-ui"))
  .settings(
    libraryDependencies ++= Dependencies.Integration.value
  )
  .disablePlugins(SbtGithubReleasePlugin)
