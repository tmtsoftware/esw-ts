#!/usr/bin/env bash

SCRIPTPATH="$(
    cd "$(dirname "$0")" >/dev/null 2>&1 || exit
    pwd -P
)"


COURSIER="$(command -v cs)" || COURSIER="$SCRIPTPATH/coursier"

APPS_PATH="https://raw.githubusercontent.com/tmtsoftware/osw-apps/master/apps.json"

APP_NAME="$1"
APP_VERSION="$2"

# Pass rest of the arguments after first argument to the corresponding app
"$COURSIER" launch --channel $APPS_PATH "$APP_NAME":"$APP_VERSION" -- "${@:3}"
