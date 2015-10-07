#!/usr/bin/fish

grunt build
forever restart dist/server
