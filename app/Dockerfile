FROM node:12.13.0

ENV APP_ROOT /usr/src/app

WORKDIR $APP_ROOT

COPY package*.json ${APP_ROOT}
# RUN npm install -g yarn && yarn
# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
# && cnpm install

RUN npm install

CMD [ "npm", "dev" ]

EXPOSE 3000
