#!/bin/sh

set -x
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
. .nvm/nvm.sh
nvm install v22.14.0
npm install -g npm@11.2.0
