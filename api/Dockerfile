FROM node:10.15-alpine

ENV HOST 0.0.0.0
ENV APP_ROOT /usr/src/api
ENV DB_NAME ${DB_NAME}
ENV DB_USER ${DB_USER}
ENV DB_PASSWORD ${DB_PASSWORD}
ENV DB_HOST ${DB_HOST}
ENV DB_PORT ${DB_PORT}
# RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

COPY package.json ${APP_ROOT}
# COPY package-lock.json ${APP_ROOT}

# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
# && cnpm install

RUN npm install

CMD [ "npm", "serve" ]

EXPOSE 8080