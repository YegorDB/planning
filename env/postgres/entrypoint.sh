#!/usr/bin/env bash

if [ ! "${DEVELOPMENT}" ]; then
  /usr/local/bin/cron_start.sh
fi

/usr/local/bin/docker-entrypoint.sh postgres
