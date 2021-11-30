import os
import glob
import pandas as pd

filenames = [
    "clean_recipes.csv",
    "clean_reviews.csv",
    "categories.csv",
    "ingredients.csv",
    "recipes_ingredients.csv",
    "keywords.csv",
    "recipes_keywords.csv",
    "users.csv"
]

os.chdir("../data")

#combine all files in the list
combined_csv = pd.concat([pd.read_csv(f) for f in filenames])

#export to csv
combined_csv.to_csv( "combined_csv.csv", index=False, encoding='utf-8-sig')