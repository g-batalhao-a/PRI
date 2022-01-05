FROM solr:latest

ARG DB

COPY ${DB} /data/recipes.json

COPY solr/schema.json /data/schema.json
COPY solr/synonyms.txt /data/synonyms.txt
COPY solr/ltr-plugin.xml /data/ltr-plugin.xml
COPY solr/features.json /data/features.json
COPY solr/ltr_model.json /data/ltr_model.json

COPY startup.sh /scripts/startup.sh

ENTRYPOINT ["/scripts/startup.sh"]
