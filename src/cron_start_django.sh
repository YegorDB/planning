#!/bin/bash

chown "root:root" /etc/cron.d/custom
chmod 0644 /etc/cron.d/custom

cp /etc/cron.d/custom /tmp/cron_custom
sed -i "/^POSTGRES_PASSWORD=/d" /tmp/cron_custom
sed -i "/^SECRET_KEY=/d" /tmp/cron_custom
cp -f /tmp/cron_custom /etc/cron.d/custom
rm /tmp/cron_custom

echo -e "$(/usr/bin/env | grep POSTGRES_PASSWORD)\n$(cat /etc/cron.d/custom)" > /etc/cron.d/custom
echo -e "$(/usr/bin/env | grep SECRET_KEY)\n$(cat /etc/cron.d/custom)" > /etc/cron.d/custom

cron
