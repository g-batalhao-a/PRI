library(readr)
library(dplyr) # Se nao tiveres tens de fazer install.packages("tidyverse")

recipes <- read_csv("data/recipes.csv")
reviews <- read_csv("data/reviews.csv")

# Obter uma copia das colunas
authorRecipes <- select(recipes, c('AuthorId', 'AuthorName')) 
authorReviews <- select(reviews, c('AuthorId', 'AuthorName'))
author <- merge(authorRecipes, authorReviews, by = "AuthorId", all = TRUE, sort = TRUE)

# Retirar a coluna authorname
new_recipes <- select(recipes, -c('AuthorName')) 
new_revies <- select(reviews, -c('AuthorName'))
