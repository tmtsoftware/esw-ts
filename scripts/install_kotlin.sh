#!/bin/sh

set -x
rm -rf $HOME/.sdkman
curl -s https://get.sdkman.io | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install kotlin 2.1.0
