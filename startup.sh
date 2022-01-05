#!/bin/bash

precreate-core recipes

cp /data/synonyms.txt /var/solr/data/recipes/conf

sed -i $'/<\/config>/{e cat /data/ltr-plugin.xml\n}' /var/solr/data/recipes/conf/solrconfig.xml

# Start Solr in background mode so we can use the API to upload the schema
solr start -Dsolr.ltr.enabled=true

sleep 10

# Schema definition via API
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/schema.json \
    http://localhost:8983/solr/recipes/schema

# Upload features for LTR
curl -XPUT 'http://localhost:8983/solr/recipes/schema/feature-store' --data-binary "@/data/features.json" -H 'Content-type:application/json'

# Upload model for LTR
curl -XPUT 'http://localhost:8983/solr/recipes/schema/model-store' --data-binary "@/data/ltr_model.json" -H 'Content-type:application/json'

# Populate collection
bin/post -c recipes /data/recipes.json

# Restart in foreground mode so we can access the interface
solr restart -f -Dsolr.ltr.enabled=true
