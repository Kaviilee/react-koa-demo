# react-koa-demo

A fullstack demo with react & koa2 & docker

## Install

```shell
git clone https://github.com/Kaviilee/react-koa-demo.git
cd react-koa-demo
npm run dev:build # or yarn dev:build
npm run dev:up # or yarn dev:up

docker exec -it db bin/bash
mysql -u$MYSQL_USER -r$MYSQL_ROOT_PASSWORD < ${WORK_PATH}/todolist.sql
```

then open browser: `localhost`

> login with account: kavii password: 123