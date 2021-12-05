#!/bin/bash

until python manage.py inspectdb &> /dev/null
do
    echo "Waiting for db ..."
    sleep 5
done

python manage.py migrate;
python manage.py collectstatic --noinput;

if [ "${DEVELOPMENT}" ]; then
	python manage.py runserver 0.0.0.0:8000;
else
	rm -f app.pid;
	/usr/local/bin/cron_start.sh;
	gunicorn -p app.pid \
           -b 0.0.0.0:8000 \
           --workers="$((`nproc` * 2 + 1))" \
           main.wsgi:application;
fi
