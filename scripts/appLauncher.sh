#!/usr/bin/env bash

APPS_PATH="https://raw.githubusercontent.com/tmtsoftware/osw-apps/master/apps.json"

APP_NAME="$1"
APP_VERSION="$2"

cs java --jvm openjdk:1.17.0
eval $(cs java --jvm openjdk:1.17.0 --env -m offline)

# Pass rest of the arguments after first argument to the corresponding app
cs launch --channel $APPS_PATH "$APP_NAME":"$APP_VERSION" -- "${@:3}"
