library(readr)
library(dplyr)
library(lubridate)

recipes <- read_csv("data/recipes.csv")
reviews <- read_csv("data/reviews.csv")

# Copy of columns 
author.recipes <- select(recipes, c('AuthorId', 'AuthorName'))
author.reviews <- select(reviews, c('AuthorId', 'AuthorName'))
recipes.images <- data.frame("Id"=integer(),"RecipeId"=integer(),"Image"=character(), stringsAsFactors = FALSE)

# Parse images
id <- 1
for (row in 1:nrow(recipes)){
  if(recipes$Images[row]=="character(0)") next
  images <- eval(parse(text = recipes$Images[row]))
  
  if (row %% 100 == 1) {
    cat("Row ", row, "(", id, ")", " -> ", images, "\n")
  }
  
  for (img in images) {
    recipes.images[id,] = c(id,recipes[row,'RecipeId'],img)
    id <- id+1
  }
  
}

names(recipes.images) <- c("Id","RecipeId","Image")

# Remove AuthorName and Images
new.recipes <- select(recipes, -c('AuthorName','Images'))
new.reviews <- select(reviews, -c('AuthorName'))

#Clean duplicate data
new.recipes <- distinct(new.recipes,.keep_all = TRUE)
new.reviews <- distinct(new.reviews,.keep_all = TRUE)
author.recipes <- distinct(author.recipes,.keep_all = TRUE)
author.reviews <- distinct(author.reviews,.keep_all = TRUE)

#Build user table
users <- merge(author.recipes,author.reviews,by = "AuthorId",all =TRUE, sort = TRUE)
users <- rename(users, "RecipeAuthor" = "AuthorName.x", "ReviewAuthor" = "AuthorName.y")

# Remove NaN rows
# new_recipes <- na.omit(new_recipes)
# new_reviews <- na.omit(new_reviews)

#Save clean files
write.csv(new.recipes,"data/recipes_n_auth.csv")
write.csv(new.reviews,"data/reviews_n_auth.csv")
write.csv(users,"data/users.csv")
write.csv(recipes.images,'data/images.csv')
