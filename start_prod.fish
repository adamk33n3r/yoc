#!/usr/bin/fish

set -x NODE_ENV production

rm ~/.forever/yoc.log
forever start -l ~/.forever/yoc.log ./dist/server
