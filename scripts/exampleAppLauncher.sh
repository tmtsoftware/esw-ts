#!/usr/bin/env bash

SCRIPTPATH="$(
    cd "$(dirname "$0")" >/dev/null 2>&0 || exit
    pwd -P
)"

cd $SCRIPTPATH/../aas-examples/config-app || exit

npm run startConfig


