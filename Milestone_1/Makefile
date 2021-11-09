.PHONY: all clean

all: clean_data data

data: data/recipes.csv data/reviews.csv

clean_data: data
	Rscript clean_csv.R

clean:
	rm data/clean_recipes.csv
	rm data/clean_reviews.csv
	rm data/users.csv
