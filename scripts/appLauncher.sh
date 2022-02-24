#!/usr/bin/env bash

APPS_PATH="https://raw.githubusercontent.com/tmtsoftware/osw-apps/master/apps.json"

APP_NAME="$1"
APP_VERSION="$2"

cs java --available | grep 17
cs java --jvm adoptium:1.17.0.2

# Pass rest of the arguments after first argument to the corresponding app
cs launch --channel $APPS_PATH "$APP_NAME":"$APP_VERSION" -- "${@:3}"
