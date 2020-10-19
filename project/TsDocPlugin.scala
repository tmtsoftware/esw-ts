import com.typesafe.sbt.site.SitePlugin.autoImport.makeSite
import org.tmt.sbt.docs.ParadoxMaterialSitePlugin
import sbt.Keys.{mappings, target, version}
import sbt.{Def, _}

object TsDocPlugin extends AutoPlugin {
  private val tsDocParentDir = "ts-docs"

  object autoImport {
    val typeDocs  = taskKey[Int]("Create esw-ts typescript documentation using typedoc.")
    val tsDocPath = settingKey[String]("path of the folder for the generated ts-doc")
  }

  import autoImport._

  override def requires: Plugins = ParadoxMaterialSitePlugin

  override def projectSettings: Seq[Setting[_]] =
    Seq(
      typeDocs := typeDocsTask.value,
      tsDocPath := tsDocPathTask.value,
      makeSite := makeSite.dependsOn(typeDocs).value,
      mappings in makeSite := {
        val tsDocs = Path.allSubpaths(new File(target.value, tsDocParentDir))
        (mappings in makeSite).value ++ tsDocs.map { case (file, output) => (file, s"/$tsDocParentDir/$output") }
      }
    )

  private def typeDocsTask =
    Def.task {
      new ProcessBuilder("sh", "-c", "cd lib && npm run doc").inheritIO().start().waitFor()
    }

  private def tsDocPathTask =
    Def.setting {
      sys.props.get("prod.docs") match {
        case Some("true") => s"https://tmtsoftware.github.io/esw-ts/${version.value}/$tsDocParentDir/%s"
        case _            => (target.value / tsDocParentDir).getAbsolutePath
      }
    }
}
