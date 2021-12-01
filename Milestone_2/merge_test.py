import pandas

json_str = ""

### Recipes

file_path = "data/solr/recipes.csv"
print("Opening file: " + file_path)

data = pandas.read_csv(file_path) # Remove nrows for production
data['Type'] = "recipe"
data.rename({"Id": "RecipeId"}, axis = 1, inplace = True)

json_data = data.head(1000).to_json(orient = "records")[:-1]

json_str = json_str + json_data


### Reviews

file_path = "data/solr/reviews.csv"
print("Opening file: " + file_path)

data = pandas.read_csv(file_path) # Remove nrows for production
data['Type'] = "review"
data.drop('Id', axis = 1, inplace = True)

json_data = data.head(1000).to_json(orient = "records")[1:-1]

json_str = json_str + "," + json_data


### Users

file_path = "data/solr/users.csv"
print("Opening file: " + file_path)

data = pandas.read_csv(file_path) # Remove nrows for production
data['Type'] = "user"
data.rename({"Id": "UserId"}, axis = 1, inplace = True)

json_data = data.head(1000).to_json(orient = "records")[1:]

json_str = json_str + "," + json_data


### Save JSON

with open("solr/recipes_test.json", 'w+') as jsonfile:
    jsonfile.write(json_str)
