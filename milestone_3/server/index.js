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

const sendSolrRequest = (params) => {
  return solr.get('/select', {params: params}).catch(function (error) {
    console.log(error)
  })
}

const parseFacets = (facets) => {
  let parsedFacets = facets
  delete parsedFacets["count"]
  parsedFacets = Object.fromEntries(Object.entries(parsedFacets).map(([key, { buckets }]) => [key, buckets]));

  if (parsedFacets.Time) {
    parsedFacets.Time[0]["name"] = "< 5m"
    parsedFacets.Time[1]["name"] = "5m - 15m"
    parsedFacets.Time[2]["name"] = "15m - 30m"
    parsedFacets.Time[3]["name"] = "30m - 1h"
    parsedFacets.Time[4]["name"] = "1h - 2h"
    parsedFacets.Time[5]["name"] = "2h - 5h"
    parsedFacets.Time[6]["name"] = "5h - 12h"
    parsedFacets.Time[7]["name"] = "12h - 1d"
    parsedFacets.Time[8]["name"] = "> 1d"
  }

  return parsedFacets
}


const getFilters = (filter, rating, time, category, ingredients) => {
  let fq = []

  // Ratings
  if (rating && rating.length === 2) {
    if (parseFloat(rating[0]) > 0)
      fq.push('AggregatedRating:[' + rating[0] + ' TO ' + rating[1] + ']')
    else // This returns recipes that have no aggregated rating
      fq.push('-(-AggregatedRating:[' + rating[0] + ' TO ' + rating[1] + '] AggregatedRating:*)')
  }

  // Total Time
  if (time && time.length === 2)
    fq.push('TotalTime:[' + time[0] + ' TO ' + time[1] + ']')

  // Category
  if (category) {
    const tag = (filter === "category" ? '{!tag=CAT}' : '')
    fq.push(tag + 'Category_Facet:(' + category.map(e => "\"" + e + "\"").join(' ') + ')')
  }

  // Ingredients
  if (ingredients) {
    const tag = (filter === "ingredients" ? '{!tag=ING}' : '')
    fq.push(tag + 'Ingredients_Facet:(' + ingredients.map(e => "\"" + e + "\"").join(' ') + ')')
  }

  return fq
}

app.get("/search", async (req, res) => {
  // Request Parameters
  const search = req.query.query;
  const sort = req.query.sort ? req.query.sort : null
  const page = req.query.page ? req.query.page - 1 : 0
  const rating = req.query.rating ? req.query.rating : null
  const filter = req.query.filter ? req.query.filter : null
  const time = req.query.time ? req.query.time.slice(1,-1).split(",") : null
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
    'json.facet': JSON.stringify({
      "Time": {
        "type": "range",
        "field": "TotalTime",
        "ranges": [
          { "range": "[0,299]" }, { "range": "[300,899]" }, { "range": "[900,1799]" },
          { "range": "[1800,3599]" }, { "range": "[3600,7199]" }, { "range": "[7200,17999]" },
          { "range": "[18000,43199]" }, { "range": "[43200,86399]" }, { "range": "[86400,*]" },
        ]
      },
      "Category": {
        "type": "terms",
        "field": "Category_Facet",
        "limit": 500,
        "sort": "index",
        "domain": { "excludeTags": "CAT" }
      },
      "Ingredients": {
        "type": "terms",
        "field": "Ingredients_Facet",
        "limit": 100000,
        "sort": "index",
        "domain": { "excludeTags":"ING" }
      }
    })
  };


  // Filters
  let fq = getFilters(filter, rating, time, category, ingredients)

  if (fq.length > 0)
    params["fq"] = fq


  // Sort
  if (sort && sort !== "Relevance")
    params["sort"] = sort
  else
    params["rq"] = '{!ltr model=myModel reRankDocs=100}'


  // Request
  console.log(params);
  const response = await sendSolrRequest(params)
  const data = [...new Map(response.data.response.docs.map((item, key) => [item['RecipeId'], item])).values()]

  const to_send = {
    recipes: data,
    total: response.data.response.numFound,
    pages: Math.ceil(response.data.response.numFound / 10),
    queryParams: req.query,
    facets: parseFacets(response.data.facets)
  }

  res.json(to_send)
});

app.get("/recipe/:id", async (req, res) => {
  if (!req.params.id) res.json({ "err": "Recipe ID is needed!" })

  const params = {
    'q': 'RecipeId:' + req.params.id,
    'q.op': 'OR',
    'wt': 'json',
    'rows': 1
  };

  const response = await sendSolrRequest(params)
  res.json(response.data.response.docs[0])
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
