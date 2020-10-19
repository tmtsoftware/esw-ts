import Common.CommonSettings
import org.tmt.sbt.docs.Settings
import Common.{typeDocs, typeDocsTask, tsDocspath}
import Libs._

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
    typeDocs := typeDocsTask().value,
    makeSite := makeSite.dependsOn(typeDocs).value,
    tsDocspath := s"${target.value}/site/esw-ts/${version.value}/ts-docs",
    Seq(mappings in makeSite := {
      val tsDocs = Path.allSubpaths(new File(target.value, "ts-docs"))
      (mappings in makeSite).value ++ tsDocs.map { case (file, output) => (file, s"/ts-docs/" + output) }
    }),
    paradoxProperties ++= Map(
      "extref.esw.base_url"     -> s"https://tmtsoftware.github.io/esw/%s",
      "extref.ts-docs.base_url" -> s"../../ts-docs/%s",
      "esw-version"             -> CSW.Version,
      "csw-version"             -> ESW.Version
    ),
    paradoxRoots := List(
      "index.html"
    )
  )

lazy val `integration-ui` = project
  .in(file("integration-ui"))
  .settings(
    libraryDependencies ++= Dependencies.Integration.value
  )
