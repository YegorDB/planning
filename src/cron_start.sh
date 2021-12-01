#!/bin/bash

chown "root:root" /etc/cron.d/rbcv
chmod 0644 /etc/cron.d/rbcv
cron
