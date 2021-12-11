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
reviews_data["Review"] = "{" + reviews_data["Rating"].astype(str) + " stars, " + reviews_data["AuthorName"] + "} " + reviews_data["Review"]
reviews_data['Reviews'] = reviews_data.groupby(['RecipeId'])['Review'].transform(lambda x : '., '.join(map(str, x)))
reviews_data = reviews_data.drop(['ReviewId', 'Date', 'AuthorId', 'AuthorName', 'Review', 'Rating'], axis = 1).drop_duplicates() 

print(len(reviews_data))
print(reviews_data.head())

# a = reviews_data[:1000000].groupby(['RecipeId'])['Review'].transform(lambda x : '., '.join(map(str, x)))
# print(a)
# for i in range(800, 900):
#     print(a[i])

# exit()

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
recipes_data = recipes_data.merge(reviews_data, how='left', on='RecipeId')

jsonfile = open("solr/recipes_full.json", 'w+')

jsonfile.write("[")

# random.seed(1)
# indexes = sorted(random.sample(range(0, len(recipes_data)), 100))

for i in range(0, len(recipes_data)):
    recipe = recipes_data.iloc[[i]].replace({np.nan:None}).to_dict('records')[0]

    if recipe["Images"] != None: recipe["Images"] = re.split(", ", recipe["Images"])
    if recipe["Keywords"] != None: recipe["Keywords"] = re.split(", ", recipe["Keywords"])
    if recipe["Ingredients"] != None: recipe["Ingredients"] = re.split(", ", recipe["Ingredients"])
    if recipe["Instructions"] != None: recipe["Instructions"] = re.split(r"(?<=\.), ", recipe["Instructions"])
    if recipe["Reviews"] != None: recipe["Reviews"] = re.split(r"\., ", recipe["Reviews"])

    # reviews = reviews_data.iloc[reviews_data["RecipeId"] == recipe["RecipeId"]]
    # if reviews.size > 0: 
    #     reviews = reviews.to_dict('records')[0]
    #     recipe["Reviews"] = re.split(r"\., ", reviews["Reviews"])

    # json_str = json_str + simplejson.dumps(recipe, ignore_nan = True) + ","
    jsonfile.write(simplejson.dumps(recipe, ignore_nan = True) + ",")

    if i % 1000 == 0: print(i)


jsonfile.write("]")
# json_str = json_str[:-1] + "]"


### Save JSON
# with open("solr/recipes_full.json", 'w+') as jsonfile:
#     jsonfile.write(json_str)
