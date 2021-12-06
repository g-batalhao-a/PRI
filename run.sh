#!/bin/bash

#Run with flag -t to use test dataset

if [[ -n $(docker ps -aq) ]]; then
    echo "Deleting previous containers"
    docker rm -vf $(docker ps -aq)
fi

DB="solr/recipes.json"

if [[ $1 == "-t" ]]; then
    echo "Using test dataset. NOT FIT FOR PRODUCTION!"
    DB="solr/recipes_test.json"
elif [[ $1 == "-n" ]]; then
    echo "Using nested documents dataset. NOT FIT FOR PRODUCTION!"
    DB="solr/recipes_nest.json"
fi

docker-compose build --build-arg DB=$DB

if [[ -n $(docker image ls -f dangling=true) ]]; then
    echo "Removing dangling images"
    docker rmi -f $(docker image ls -f dangling=true)
fi

docker-compose up