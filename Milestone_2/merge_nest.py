import pandas
import simplejson

### Users
print("Parsing Users")
users_data = pandas.read_csv("data/solr/users.csv")
users_data.rename({"Id": "AuthorId", "Name": "AuthorName"}, axis = 1, inplace = True)

### Reviews
print("Parsing Reviews")
reviews_data = pandas.read_csv("data/solr/reviews.csv")
reviews_data['Type'] = "review"
reviews_data.rename({"Id": "ReviewId", "UserId": "AuthorId"}, axis = 1, inplace = True)
reviews_data['DateModified'] = reviews_data['DateModified'].astype(str) + 'T00:00:00Z'
reviews_data = reviews_data.merge(users_data, how='left', on='AuthorId')

### Recipes
print("Parsing Recipes")
recipes_data = pandas.read_csv("data/solr/recipes.csv")
recipes_data['Type'] = "recipe"
recipes_data.rename({"Id": "RecipeId", "UserId": "AuthorId"}, axis = 1, inplace = True)
recipes_data = recipes_data.merge(users_data, how='left', on='AuthorId')


json_str = "["

for i in range(0, 15000):
    if i > 0: json_str = json_str + ","

    recipe = recipes_data[i:i+1].to_dict('records')[0]
    reviews = reviews_data[reviews_data["RecipeId"] == recipe["RecipeId"]]
    
    if reviews.size > 0: 
        reviews = reviews.drop('RecipeId', axis = 1).to_dict('records')
        recipe["reviews"] = reviews

    json_str = json_str + simplejson.dumps(recipe, ignore_nan = True)

json_str = json_str + "]"


### Save JSON
with open("solr/recipes_nest.json", 'w+') as jsonfile:
    jsonfile.write(json_str)
