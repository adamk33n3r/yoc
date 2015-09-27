#!/usr/bin/fish

set -x NODE_ENV production

forever start ./dist/server
