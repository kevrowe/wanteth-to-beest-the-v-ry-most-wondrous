FROM node:12-alpine

ADD dist /usr/src/app

WORKDIR /usr/src/app

ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install --production

EXPOSE 3001

ENTRYPOINT [ "node", "/usr/src/app" ]
