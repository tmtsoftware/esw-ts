package org.tmt

import csw.framework.deploy.containercmd.ContainerCmd
import csw.prefix.models.Subsystem.ESW

object ContainerCmdApp extends App {

  ContainerCmd.start("ContainerCmdApp", ESW, args)
}
