addSbtPlugin("com.timushev.sbt" % "sbt-updates"             % "0.5.0")
addSbtPlugin("org.scalameta"    % "sbt-scalafmt"            % "2.3.2")
addSbtPlugin("com.dwijnand"     % "sbt-dynver"              % "4.0.0")
addSbtPlugin("io.spray"         % "sbt-revolver"            % "0.9.1")
addSbtPlugin("org.scala-js"     % "sbt-scalajs"             % "0.6.32")
addSbtPlugin("ch.epfl.scala"    % "sbt-web-scalajs-bundler" % "0.15.0-0.6")
addSbtPlugin("ch.epfl.scala"    % "sbt-scalajs-bundler"     % "0.15.0-0.6")
addSbtPlugin("ohnosequences"    % "sbt-github-release"      % "0.7.0")

libraryDependencies += "com.sun.activation" % "javax.activation" % "1.2.0"

resolvers += Resolver.bintrayRepo("twtmt", "sbt-plugins")
addSbtPlugin("com.github.tmtsoftware" % "sbt-docs" % "0.1.4")

classpathTypes += "maven-plugin"
