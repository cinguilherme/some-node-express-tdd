FROM node:12-alpine3.12

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 3000
