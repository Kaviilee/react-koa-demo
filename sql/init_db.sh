#!/bin/bash
echo ${MYSQL_USER} + ${MYSQL_ROOT_PASSWORD}
mysql -u${MYSQL_USER} -p${MYSQL_ROOT_PASSWORD} < todolist.sql