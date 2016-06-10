#!/usr/bin/fish

git fetch; and git co origin/master; and bower install; and npm install; and grunt build; and forever restart dist/server
