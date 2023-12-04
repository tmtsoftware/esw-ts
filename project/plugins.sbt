addSbtPlugin("com.timushev.sbt" % "sbt-updates"        % "0.6.4")
addSbtPlugin("org.scalameta"    % "sbt-scalafmt"       % "2.5.2")
addSbtPlugin("io.spray"         % "sbt-revolver"       % "0.10.0")
addSbtPlugin("ohnosequences"    % "sbt-github-release" % "0.7.0")

libraryDependencies += "com.sun.activation" % "javax.activation" % "1.2.0"

resolvers += "jitpack" at "https://jitpack.io"
libraryDependencies += "com.github.tmtsoftware" % "sbt-docs" % "ac4d094"

classpathTypes += "maven-plugin"
