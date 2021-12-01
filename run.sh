#!/bin/bash

docker rm -vf $(docker ps -aq)

docker-compose up --build