# PRI

## Solr

To run solr, please run the following command from the `/sources` folder:

```
./run.sh -b
```

NOTE: For testing, please run the command with the extra `-t` flag. This will load Solr with a smaller dataset, present in this zip.

## User Interface

After Solr is running, please follow the next instructions:

Firstly, from the `/sources/milestone_3` folder, run the following command to start the backend:

```
npm install & npm start
```

After backend is running, run the following command from the `/sources/milestone_3/client` folder:

```
npm install & npm start
```

If Solr, Backend and Frontend are running, you can then join `https://localhost:3000` to interact with the user interface of our search system.