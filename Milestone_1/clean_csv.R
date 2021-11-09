library(readr)
library(dplyr)
library(lubridate)

recipes <- read_csv("data/recipes.csv")
reviews <- read_csv("data/reviews.csv")

# Copy of columns 
author.recipes <- select(recipes, c('AuthorId', 'AuthorName'))
author.reviews <- select(reviews, c('AuthorId', 'AuthorName'))
recipes.images <- data.frame("Id"=integer(),"RecipeId"=integer(),"Image"=character(), stringsAsFactors = FALSE)

# Remove AuthorName and Images
new.recipes <- select(recipes, -c('AuthorName','Images'))
new.reviews <- select(reviews, -c('AuthorName'))

#Clean duplicate data
new.recipes <- distinct(new.recipes,.keep_all = TRUE)
new.reviews <- distinct(new.reviews,.keep_all = TRUE)
author.recipes <- distinct(author.recipes,.keep_all = TRUE)
author.reviews <- distinct(author.reviews,.keep_all = TRUE)

# Parse Times
new.recipes$CookTime <- as.numeric(duration(new.recipes$CookTime))
new.recipes$PrepTime <- as.numeric(duration(new.recipes$PrepTime))
new.recipes$TotalTime <- as.numeric(duration(new.recipes$TotalTime))

#Build user table
users <- merge(author.recipes,author.reviews,by = "AuthorId",all =TRUE, sort = TRUE)
users <- rename(users, "RecipeAuthor" = "AuthorName.x", "ReviewAuthor" = "AuthorName.y")

#Save clean files
write.csv(new.recipes,"data/recipes_n_auth.csv")
write.csv(new.reviews,"data/reviews_n_auth.csv")
write.csv(users,"data/users.csv")
