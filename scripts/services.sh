#!/usr/bin/env bash

SCRIPTPATH="$(
    cd "$(dirname "$0")" >/dev/null 2>&1 || exit
    pwd -P
)"

TMT_BACKEND_LIB=com.github.tmtsoftware:backend-testkit_2.13
TMT_BACKEND_VERSION="4573e3fe60"
LONELYPLANET_RESOLVER=bintray:lonelyplanet/maven
AKKA_HTTP_SPRAY_JSON=com.typesafe.akka:akka-http-spray-json_2.13:10.2.0-M1

COURSIER="$(command -v cs)" || COURSIER="$SCRIPTPATH/scripts/coursier"

"$COURSIER" launch -r $LONELYPLANET_RESOLVER -r jitpack -r https://jcenter.bintray.com $TMT_BACKEND_LIB:$TMT_BACKEND_VERSION $AKKA_HTTP_SPRAY_JSON -M org.tmt.BackendService -- "$@"
