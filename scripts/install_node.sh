#!/bin/bash

set -x
rm -rf $HOME/.nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
. .nvm/nvm.sh
nvm install v22.14.0
. .nvm/nvm.sh
npm install -g npm@11.2.0
