FROM node:8-alpine
LABEL maintainer="Joseph Schultz <joseph@acupajoe.io>"

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

ENV NODE_ENV production

CMD ./node_modules/.bin/sequelize db:migrate && yarn start