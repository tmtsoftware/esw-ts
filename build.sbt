import Common.CommonSettings
import org.tmt.sbt.docs.Settings

inThisBuild(
  CommonSettings
)

lazy val aggregatedProjects: Seq[ProjectReference] = Seq(
  `selenium-tests`,
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

lazy val `selenium-tests` = project
  .in(file("selenium-tests"))
  .settings(
    libraryDependencies ++= Dependencies.Integration.value
  )
