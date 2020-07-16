FROM mysql:5.7
ARG MYSQL_ROOT_PASSWORD
ARG MYSQL_USER

ENV MYSQL_ROOT_PASSWORD $MYSQL_ROOT_PASSWORD
ENV MYSQL_USER $MYSQL_USER
ENV WORK_PATH /usr/local/db
ENV FILE_0 todolist.sql

RUN mkdir /usr/local/db

COPY ./todolist.sql ${WORK_PATH}
COPY init_db.sh /docker-entrypoint-initdb.d/init_db.sh

RUN chmod a+x /docker-entrypoint-initdb.d/init_db.sh