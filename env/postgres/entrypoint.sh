#!/usr/bin/env bash

echo `date '+%Y-%m-%d %X'` > /test123

/usr/local/bin/docker-entrypoint.sh postgres
