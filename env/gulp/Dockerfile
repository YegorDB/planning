FROM node:16.13

COPY ./entrypoint.sh /entrypoint.sh

RUN ["npm", "install", "--global", "gulp-cli"]

WORKDIR /code

ENTRYPOINT ["/entrypoint.sh"]
