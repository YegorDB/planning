FROM node:15.5

COPY ./entrypoint.sh /entrypoint.sh

RUN ["npm", "install", "--global", "gulp-cli"]
RUN ["npm", "install", "--global", "less"]

WORKDIR /code

ENTRYPOINT ["/entrypoint.sh"]
