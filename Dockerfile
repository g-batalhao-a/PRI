FROM solr:latest

ARG DB

COPY ${DB} /data/recipes.json

COPY solr/schema.json /data/schema.json
COPY solr/synonyms.txt /data/synonyms.txt

COPY startup.sh /scripts/startup.sh

ENTRYPOINT ["/scripts/startup.sh"]
