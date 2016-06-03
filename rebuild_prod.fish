#!/usr/bin/fish

git fetch; and git co origin/master; and grunt build; and forever restart dist/server
