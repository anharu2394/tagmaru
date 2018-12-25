#!/bin/sh
rm tmp/pids/server.pid
bundle exec rails s -p 4000 -b '0.0.0.0'

