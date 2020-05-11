#!/usr/bin/env bash

SCRIPTPATH="$(cd "$(dirname "$0")" >/dev/null 2>&1 || exit ; pwd -P )"

cd "$SCRIPTPATH/tmt-backend" || exit

args=""
for i in "$@" ; do
    args="${args} ${i}"
done
sbt "~run ${args}"

#kill -9 $(ps aux | grep "Backend" | awk '{print $2}' | head -1 )
