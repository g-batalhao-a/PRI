import numpy as np
import pandas
import simplejson
import random
import re

### Users
print("Parsing Users")
users_data = pandas.read_csv("data/solr/users.csv")
users_data.rename({"Id": "AuthorId", "Name": "AuthorName"}, axis = 1, inplace = True)

### Reviews
print("Parsing Reviews")
reviews_data = pandas.read_csv("data/solr/reviews.csv")
#reviews_data['Type'] = "review"
reviews_data.rename({
    "Id": "ReviewId", 
    "UserId": "AuthorId",
    "DateModified": "Date"
}, axis = 1, inplace = True)
#reviews_data['Date'] = reviews_data['Date'].astype(str) + 'T00:00:00Z'
reviews_data = reviews_data.merge(users_data, how='left', on='AuthorId')

### Recipes
print("Parsing Recipes")
recipes_data = pandas.read_csv("data/solr/recipes.csv")
#recipes_data['Type'] = "recipe"
recipes_data.rename({
    "Id": "RecipeId", 
    "UserId": "AuthorId", 
    "DatePublished": "Date",
    "RecipeCategory": "Category", 
    "RecipeIngredientParts": "Ingredients",
    "RecipeServings": "Servings",
    "RecipeYield": "Yield",
    "RecipeInstructions": "Instructions"
}, axis = 1, inplace = True)
recipes_data = recipes_data.merge(users_data, how='left', on='AuthorId')


json_str = "["

random.seed(1)
indexes = sorted(random.sample(range(0, len(recipes_data)), 100))

for i in indexes:
    recipe = recipes_data[i:i+1].replace({np.nan:None}).to_dict('records')[0]

    if recipe["Images"] != None: recipe["Images"] = re.split(", ", recipe["Images"])
    if recipe["Keywords"] != None: recipe["Keywords"] = re.split(", ", recipe["Keywords"])
    if recipe["Ingredients"] != None: recipe["Ingredients"] = re.split(", ", recipe["Ingredients"])
    if recipe["Instructions"] != None: recipe["Instructions"] = re.split(r"(?<=\.), ", recipe["Instructions"])

    reviews = reviews_data[reviews_data["RecipeId"] == recipe["RecipeId"]]
    if reviews.size > 0: 
        reviews["Review"] = "{" + reviews["Rating"].astype(str) + " stars, " + reviews["AuthorName"] + "} " + reviews["Review"]
        recipe["Reviews"] = reviews["Review"].to_list()

    json_str = json_str + simplejson.dumps(recipe, ignore_nan = True) + ","

    if i % 1000 == 0: print(i)

json_str = json_str[:-1] + "]"


### Save JSON
with open("solr/recipes_nest.json", 'w+') as jsonfile:
    jsonfile.write(json_str)
