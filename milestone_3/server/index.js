const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const solr = axios.create({
  baseURL: 'http://localhost:8983/solr/recipes',
  timeout: 1000
});

app.get("/search", (req, res) => {
  const search = req.query.query;
  const page = req.query.page ? req.query.page - 1 : 0

  let fq = ''

  // if (withRating === "true")
  //   fq += 'AggregatedRating:[' + minRating + ' TO ' + maxRating + ']'
  // else
  //   fq += '-(-AggregatedRating:[' + minRating + ' TO ' + maxRating + '] AggregatedRating:*)'

  let params = {
    'q': search,
    'fq': fq,
    'q.op': 'OR',
    'qf': 'Name Description Ingredients',
    'wt': 'json',
    'defType': 'edismax',
    'rows': 10,
    'start': page * 10,
    'json.facet': {
      "Category": {
        "type": "terms",
        "field": "Category",
        "limit": 500
      },
      "Ingredients": {
        "type": "terms",
        "field": "Ingredients",
        "limit": 100000
      }
    }
  };

  if (req.query.sort && req.query.sort !== "Relevance") {
    params["sort"] = req.query.sort
  }

  console.log(params);

  solr.get('/select', {params: params})
    .then(function (response) {
      const data = [...new Map(response.data.response.docs.map((item, key) => [item['RecipeId'], item])).values()]

      let facets = response.data.facets
      delete facets["count"]
      facets = Object.fromEntries(Object.entries(facets).map(([key, { buckets }]) => [key, buckets]));

      const to_send = {
        recipes: data,
        total: response.data.response.numFound,
        pages: Math.ceil(response.data.response.numFound / 10),
        queryParams: req.query,
        facets: facets
      }

      res.json(to_send)
    })
    .catch(function (error) {
      console.log(error)
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
