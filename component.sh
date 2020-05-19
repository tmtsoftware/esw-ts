#!/usr/bin/env bash

SCRIPTPATH="$(
    cd "$(dirname "$0")" >/dev/null 2>&1 || exit
    pwd -P
)"

TMT_BACKEND_LIB=com.github.tmtsoftware.tmt-backend:tmt-backend_2.13
TMT_BACKEND_VERSION="0.1.0-SNAPSHOT"
LONELYPLANET_RESOLVER=bintray:lonelyplanet/maven
AKKA_HTTP_SPRAY_JSON=com.typesafe.akka:akka-http-spray-json_2.13:10.2.0-M1

COURSIER_BIN=$SCRIPTPATH/tmt-backend/scripts/coursier
$COURSIER_BIN launch -r $LONELYPLANET_RESOLVER -r jitpack -r https://jcenter.bintray.com $TMT_BACKEND_LIB:$TMT_BACKEND_VERSION $AKKA_HTTP_SPRAY_JSON -M org.tmt.ContainerCmdApp -- "$@"
