FROM postgres:12.9

RUN apt-get update && \
    apt-get -y install cron

COPY ./entrypoint.sh /usr/local/bin/custom-entrypoint.sh

ENTRYPOINT ["custom-entrypoint.sh"]
