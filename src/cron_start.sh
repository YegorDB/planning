#!/bin/bash

chown "root:root" /etc/cron.d/custom
chmod 0644 /etc/cron.d/custom
cron
