package org.tmt

import caseapp.{CommandName, ExtraName, HelpMessage}

sealed trait TSComponentCommands

object TSComponentCommands {

  @CommandName("startComponent")
  case class StartComponent(
      @HelpMessage("Config(contains prefix, componentType, handler etc) name to start component e.g. testHCD.conf")
      @ExtraName("c")
      componentConf: String
  ) extends TSComponentCommands
}
