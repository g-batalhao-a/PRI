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
  const withRating = req.query.withRating ? req.query.withRating : "false"
  const minRating = req.query.minRating ? req.query.minRating : "*"
  const maxRating = req.query.maxRating ? req.query.maxRating : "*"
  const page = req.query.page ? req.query.page - 1 : 0
  const rows = req.query.rows;

  let fq = ''

  if (withRating === "true")
    fq += 'AggregatedRating:[' + minRating + ' TO ' + maxRating + ']'
  else
    fq += '-(-AggregatedRating:[' + minRating + ' TO ' + maxRating + '] AggregatedRating:*)'

  let params = {
    'q': search,
    'fq': fq,
    'q.op': 'OR',
    'qf': 'Name Description Ingredients',
    'wt': 'json',
    'defType': 'edismax',
    'rows': rows,
    'start': page * rows
  };

  console.log(params);

  solr.get('/select', {params: params})
    .then(function (response) {
      const data = [...new Map(response.data.response.docs.map((item, key) => [item['RecipeId'], item])).values()]

      const to_send = {
        recipes: data,
        total: response.data.response.numFound,
        pages: Math.ceil(response.data.response.numFound / rows),
        queryParams: req.query
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
