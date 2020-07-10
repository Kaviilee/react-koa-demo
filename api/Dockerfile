FROM node:10.15-alpine

ENV HOST 0.0.0.0
ENV APP_ROOT /usr/src/api

# RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

COPY package*.json ${APP_ROOT}

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
&& cnpm install

CMD [ "npm", "serve" ]

EXPOSE 8080