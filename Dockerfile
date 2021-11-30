FROM solr:8.10

COPY solr/recipes.json /data/recipes.json

COPY solr/schema.json /data/schema.json

COPY startup.sh /scripts/startup.sh

ENTRYPOINT ["/scripts/startup.sh"]
