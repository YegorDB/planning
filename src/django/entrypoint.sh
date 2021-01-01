#!/bin/bash

until python manage.py inspectdb &> /dev/null
do
    echo "Waiting for db ..."
    sleep 5
done

python manage.py migrate
python manage.py collectstatic --noinput
python manage.py runserver 0.0.0.0:8000
