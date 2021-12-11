#!/bin/bash

precreate-core recipes

# Start Solr in background mode so we can use the API to upload the schema
solr start

sleep 10

cp /data/synonyms.txt /var/solr/data/recipes/conf

# Schema definition via API
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/schema.json \
    http://localhost:8983/solr/recipes/schema

# Populate collection
bin/post -c recipes /data/recipes.json

# Restart in foreground mode so we can access the interface
solr restart -f
