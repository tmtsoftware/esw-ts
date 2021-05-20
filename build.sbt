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
  .enablePlugins(ParadoxMaterialSitePlugin, TsDocPlugin)
  .settings(
    paradoxProperties ++= Map(
      "extref.ts-docs.base_url" -> TsDocPlugin.tsDocPath.value,
      "esw-version"             -> ESW.Version.getOrElse("0.1.0-SNAPSHOT"),
      "csw-version"             -> CSW.Version.getOrElse("0.1.0-SNAPSHOT")
    )
  )

lazy val `integration-ui` = project
  .in(file("integration-ui"))
  .settings(
    libraryDependencies ++= Dependencies.Integration.value
  )
