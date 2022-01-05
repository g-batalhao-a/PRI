const express = require("express");
const axios = require('axios');
const Qs = require('qs')

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
  timeout: 5000,
  paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
});

app.get("/search", (req, res) => {
  // Request Parameters
  const search = req.query.query;
  const sort = req.query.sort ? req.query.sort : null
  const page = req.query.page ? req.query.page - 1 : 0
  const rating = req.query.rating ? req.query.rating : null
  const filter = req.query.filter ? req.query.filter : null
  const category = req.query.category ? req.query.category : null
  const ingredients = req.query.ingredients ? req.query.ingredients : null


  // General Parameters
  let params = {
    'q': search,
    'q.op': 'OR',
    'qf': 'Name Description Ingredients Keywords Instructions Reviews AuthorName',
    'wt': 'json',
    'defType': 'edismax',
    'rows': 10,
    'start': page * 10,
    'json.facet': {
      "Category": {
        "type": "terms",
        "field": "Category_Facet",
        "limit": 500,
        "sort": "index"
      },
      "Ingredients": {
        "type": "terms",
        "field": "Ingredients_Facet",
        "limit": 100000,
        "sort": "index"
      }
    }
  };


  // Filters
  let fq = []

  if (rating && rating.length == 2) {
    if (parseFloat(rating[0]) > 0)
      fq.push('AggregatedRating:[' + rating[0] + ' TO ' + rating[1] + ']')
    else // This returns recipes that have no aggregated rating
      fq.push('-(-AggregatedRating:[' + rating[0] + ' TO ' + rating[1] + '] AggregatedRating:*)')
  }
  if (filter) {
    if (filter === "category") {
      params['json.facet']["Category"]["domain"] = { "excludeTags":"CAT" }

      if (category) 
        fq.push('{!tag=CAT}Category:(' + category.map(e => "\"" + e + "\"").join(' ') + ')')
      if (ingredients)
        fq.push('Ingredients:(' + ingredients.map(e => "\"" + e + "\"").join(' ') + ')')
    }
    else if (filter === "ingredients") {
      params['json.facet']["Ingredients"]["domain"] = { "excludeTags":"ING" }

      if (category) 
        fq.push('Category:(' + category.map(e => "\"" + e + "\"").join(' ') + ')')
      if (ingredients)
        fq.push('{!tag=ING}Ingredients:(' + ingredients.map(e => "\"" + e + "\"").join(' ') + ')')
    }
  }

  params['json.facet'] = JSON.stringify(params['json.facet'])

  if (fq.length > 0)
    params["fq"] = fq


  // Sort
  if (sort && sort !== "Relevance")
    params["sort"] = sort
  else
    params["rq"] = '{!ltr model=myModel reRankDocs=100}'

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
