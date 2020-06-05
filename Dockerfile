FROM node:carbon-alpine
WORKDIR /www
COPY . /www
RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn run build && \
    yarn cache clean
