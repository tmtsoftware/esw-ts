import com.typesafe.sbt.site.SitePlugin.autoImport.{makeSite, siteDirectory, siteMappings}
import org.tmt.sbt.docs.DocKeys.docsParentDir
import org.tmt.sbt.docs.ParadoxMaterialSitePlugin
import sbt.Keys.{baseDirectory, mappings, target, version}
import sbt._

object TsDocPlugin extends AutoPlugin {
  private val tsDocParentDir = "ts-docs"

  object autoImport {
    val typeDocs = taskKey[Int]("Create esw-ts typescript documentation using typedoc.")
  }

  import autoImport._

  override def requires: Plugins = ParadoxMaterialSitePlugin

  override def projectSettings: Seq[Setting[_]] =
    Seq(
      typeDocs := typeDocsTask.value,
      makeSite := makeSite.dependsOn(typeDocs).value,
      mappings in makeSite := {
        val tsDocs = Path.allSubpaths(new File(target.value, tsDocParentDir))
        (mappings in makeSite).value ++ tsDocs.map { case (file, output) => (file, s"/$tsDocParentDir/$output") }
      }
    )

  private def typeDocsTask =
    Def.task {
      new ProcessBuilder("sh", "-c", "npm run doc").inheritIO().start().waitFor()
    }

  def tsDocPath: Def.Initialize[String] =
    Def.setting {
      sys.props.get("prod.publish") match {
        case Some("true") => s"https://tmtsoftware.github.io/esw-ts/${version.value}/$tsDocParentDir/%s"
        case _            => s"file://${new File(target.value.getParent).getParent}/target/site/esw-ts/${version.value}/ts-docs/%s"
      }
    }
}
