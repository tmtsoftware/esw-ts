addSbtPlugin("com.timushev.sbt" % "sbt-updates"        % "0.5.3")
addSbtPlugin("org.scalameta"    % "sbt-scalafmt"       % "2.4.2")
addSbtPlugin("com.dwijnand"     % "sbt-dynver"         % "4.1.1")
addSbtPlugin("io.spray"         % "sbt-revolver"       % "0.9.1")
addSbtPlugin("ohnosequences"    % "sbt-github-release" % "0.7.0")

libraryDependencies += "com.sun.activation" % "javax.activation" % "1.2.0"

resolvers += "jitpack" at "https://jitpack.io"
libraryDependencies += "com.github.tmtsoftware" % "sbt-docs" % "0348387"

classpathTypes += "maven-plugin"
