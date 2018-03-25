FROM node:9-alpine

ENV HOST 0.0.0.0

WORKDIR /usr/src/app

COPY package.json yarn.lock .env.example /usr/src/app/

RUN yarn install

COPY . /usr/src/app
