import com.typesafe.sbt.site.SitePlugin.autoImport.{makeSite, siteDirectory}
import org.scalafmt.sbt.ScalafmtPlugin.autoImport.scalafmtOnCompile
import org.tmt.sbt.docs.DocKeys.{docsParentDir, docsRepo, gitCurrentRepo}
import sbt.Keys._
import sbt._

object Common {

  val detectCycles: SettingKey[Boolean] = settingKey[Boolean]("is cyclic check enabled?")

  private val storyReport: Boolean = sys.props.get("generateStoryReport").contains("true")
  private val reporterOptions: Seq[Tests.Argument] =
    if (storyReport) Seq(Tests.Argument(TestFrameworks.ScalaTest, "-oDF", "-C", "tmt.test.reporter.TestReporter"))
    else Seq(Tests.Argument("-oDF"))

  lazy val DocsSettings = Seq(
    docsRepo       := "https://github.com/tmtsoftware/tmtsoftware.github.io.git",
    docsParentDir  := "esw-ts",
    gitCurrentRepo := "https://github.com/tmtsoftware/esw-ts"
  )

  lazy val CommonSettings: Seq[Setting[_]] = DocsSettings ++ Seq(
    organization     := "com.github.tmtsoftware.esw-ts",
    organizationName := "TMT Org",
    scalaVersion     := Libs.ScalaVersion,
    Global / concurrentRestrictions += Tags.limit(Tags.All, 1),
    homepage := Some(url("https://github.com/tmtsoftware/esw-ts")),
    resolvers += "jitpack" at "https://jitpack.io",
    resolvers += "Apache Pekko Staging".at("https://repository.apache.org/content/groups/staging"),
    scmInfo := Some(
      ScmInfo(url("https://github.com/tmtsoftware/esw-ts"), "git@github.com:tmtsoftware/esw-ts.git")
    ),
    licenses := Seq(("Apache-2.0", url("http://www.apache.org/licenses/LICENSE-2.0"))),
    scalacOptions ++= Seq(
      "-encoding",
      "UTF-8",
      "-feature",
      "-unchecked",
      "-deprecation"
    ),
    Compile / doc / javacOptions ++= Seq("-Xdoclint:none"),
    version := sys.env.getOrElse("JITPACK_VERSION", "0.1.0-SNAPSHOT"),
    commands += Command.command("openSite") { (state) =>
      val uri = s"file://${Project.extract(state).get(siteDirectory)}/${docsParentDir.value}/${version.value}/index.html"
      state.log.info(s"Opening browser at $uri ...")
      java.awt.Desktop.getDesktop.browse(new java.net.URI(uri))
      state
    },
    fork                := true,
    detectCycles        := true,
    autoCompilerPlugins := true,
    Global / cancelable := true, // allow ongoing test(or any task) to cancel with ctrl + c and still remain inside sbt
    if (formatOnCompile) scalafmtOnCompile := true else scalafmtOnCompile := false,
    Test / testOptions ++= reporterOptions
  )

  private def formatOnCompile =
    sys.props.get("format.on.compile") match {
      case Some("false") => false
      case _             => true
    }

}
