import numpy as np
import pandas
import simplejson
import re

### Users
print("Parsing Users")
users_data = pandas.read_csv("../data/solr/users.csv")
users_data.rename({"Id": "AuthorId", "Name": "AuthorName"}, axis = 1, inplace = True)

### Reviews
print("Parsing Reviews")
reviews_data = pandas.read_csv("../data/solr/reviews.csv")
reviews_data.rename({
    "Id": "ReviewId", 
    "UserId": "AuthorId",
    "DateModified": "Date"
}, axis = 1, inplace = True)
reviews_data = reviews_data.merge(users_data, how='left', on='AuthorId')
reviews_data["Review"] = "{" + reviews_data["Rating"].astype(str) + " stars, " + reviews_data["AuthorName"] + "} " + reviews_data["Review"]
reviews_data['Reviews'] = reviews_data.groupby(['RecipeId'])['Review'].transform(lambda x : '., '.join(map(str, x)))
reviews_data = reviews_data.drop(['ReviewId', 'Date', 'AuthorId', 'AuthorName', 'Review', 'Rating'], axis = 1).drop_duplicates() 

### Recipes
print("Parsing Recipes")
recipes_data = pandas.read_csv("../data/solr/recipes.csv")
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
recipes_data = recipes_data.merge(reviews_data, how='left', on='RecipeId')

jsonfile = open("../solr/recipes.json", 'w+')
jsonfile.write("[")

for i in range(0, len(recipes_data)):
    recipe = recipes_data.iloc[[i]].replace({np.nan:None}).to_dict('records')[0]

    if recipe["Images"] != None: recipe["Images"] = re.split(", ", recipe["Images"])
    if recipe["Keywords"] != None: recipe["Keywords"] = re.split(", ", recipe["Keywords"])
    if recipe["Ingredients"] != None: recipe["Ingredients"] = re.split(", ", recipe["Ingredients"])
    if recipe["Instructions"] != None: recipe["Instructions"] = re.split(r"(?<=\.), ", recipe["Instructions"])
    if recipe["Reviews"] != None: recipe["Reviews"] = re.split(r"\., ", recipe["Reviews"])

    jsonfile.write(simplejson.dumps(recipe, ignore_nan = True) + ",")

    if i % 1000 == 0: print(i)


jsonfile.write("]")
