FROM node:10.15-alpine

ENV APP_ROOT /usr/src/app

WORKDIR $APP_ROOT

COPY package*.json ${APP_ROOT}
# RUN npm install -g yarn && yarn
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
&& cnpm install

# RUN npm install

CMD [ "npm", "dev" ]

EXPOSE 3000
