FROM nginx:1.20

RUN apt-get update && \
    apt-get -y install logrotate

COPY ./entrypoint.sh /usr/local/bin/custom-entrypoint.sh

ENTRYPOINT ["custom-entrypoint.sh"]

EXPOSE 80
