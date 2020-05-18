package org.tmt

import caseapp.{ExtraName, HelpMessage}

sealed trait TSComponentCommands

object TSComponentCommands {

  case class StartComponent(
      @HelpMessage("Config(contains prefix, componentType, handler etc) name to start component e.g. testHCD.conf")
      @ExtraName("c")
      componentConf: String
  ) extends TSComponentCommands
}
