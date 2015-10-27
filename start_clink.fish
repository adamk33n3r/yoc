#!/usr/bin/fish

set -x NODE_ENV production

rm ~/.forever/clink.log
forever start -l ~/.forever/clink.log -c coffee ./clink.coffee
