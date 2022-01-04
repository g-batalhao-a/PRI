#!/bin/bash

#Run with flag -t to use test dataset

while getopts tbd opt; do
    case $opt in
        t) TEST=true;;
        b) BUILD=true;;
        d) DET=true;;
    esac
done

if [[ $BUILD ]]; then
    if [[ -n $(docker ps -aq) ]]; then
        echo "Deleting previous containers"
        docker rm -vf $(docker ps -aq)
    fi

    DB="solr/recipes.json"

    if [[ $TEST ]]; then
        echo "Using test dataset. NOT FIT FOR PRODUCTION!"
        DB="solr/recipes_test.json"
    fi

    docker-compose build --build-arg DB=$DB

    if [[ -n $(docker image ls -f dangling=true) ]]; then
        echo "Removing dangling images"
        docker rmi -f $(docker image ls -f dangling=true)
    fi
fi

if [[ $DET ]]; then
    docker-compose up -d
else
    docker-compose up
fi