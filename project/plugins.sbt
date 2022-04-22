addSbtPlugin("com.timushev.sbt" % "sbt-updates"        % "0.6.1")
addSbtPlugin("org.scalameta"    % "sbt-scalafmt"       % "2.4.6")
addSbtPlugin("io.spray"         % "sbt-revolver"       % "0.9.1")
addSbtPlugin("ohnosequences"    % "sbt-github-release" % "0.7.0")

libraryDependencies += "com.sun.activation" % "javax.activation" % "1.2.0"

resolvers += "jitpack" at "https://jitpack.io"
libraryDependencies += "com.github.tmtsoftware" % "sbt-docs" % "115000a"

classpathTypes += "maven-plugin"
