#!/bin/sh

if [ ! "${DEVELOPMENT}" ]; then
  chown "root:root" /etc/cron.d/custom
  chmod 0644 /etc/cron.d/custom
  cron
fi

/docker-entrypoint.sh
