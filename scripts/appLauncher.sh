#!/usr/bin/env bash

#APPS_PATH="https://raw.githubusercontent.com/tmtsoftware/osw-apps/master/apps.json"
APPS_PATH="https://raw.githubusercontent.com/tmtsoftware/osw-apps/branch-6.0.x/apps.json"

APP_NAME="$1"
APP_VERSION="$2"

eval $(cs java --jvm temurin:1.21.0 --env)

# Pass rest of the arguments after first argument to the corresponding app
cs launch --channel $APPS_PATH "$APP_NAME":"$APP_VERSION" -- "${@:3}"
