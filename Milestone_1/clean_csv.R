if (!require("readr")) install.packages("readr")
if (!require("dplyr")) install.packages("dplyr")
if (!require("lubridate")) install.packages("lubridate")
if (!require("stringr")) install.packages("stringr")
if (!require("tidyr")) install.packages("tidyr")

recipes <- read_csv("data/recipes.csv")
reviews <- read_csv("data/reviews.csv")

# Copy of columns 
author.recipes <- select(recipes, c('AuthorId', 'AuthorName'))
author.reviews <- select(reviews, c('AuthorId', 'AuthorName'))

# Remove AuthorName and Images
new.recipes <- select(recipes, -c('AuthorName','Images', 'RecipeIngredientQuantities'))
new.reviews <- select(reviews, -c('AuthorName','DateSubmitted'))

#Clean duplicate data
new.recipes <- distinct(new.recipes,.keep_all = TRUE)
new.reviews <- distinct(new.reviews,.keep_all = TRUE)
author.recipes <- distinct(author.recipes,.keep_all = TRUE)
author.reviews <- distinct(author.reviews,.keep_all = TRUE)

# Parse Times
new.recipes$CookTime <- as.numeric(duration(new.recipes$CookTime))
new.recipes$PrepTime <- as.numeric(duration(new.recipes$PrepTime))
new.recipes$TotalTime <- as.numeric(duration(new.recipes$TotalTime))

# Remove Hour from dates
new.recipes <- separate(new.recipes, DatePublished, "DatePublished", sep = " ", extra = "drop")
new.reviews <- separate(new.reviews, DateModified, "DateModified", sep = " ", extra = "drop")

#Create Links
new.recipes <- new.recipes %>% mutate(URL = paste("https://www.food.com/recipe/",
                                                  tolower(str_replace_all(str_replace_all(Name,"&quot;","\""), c("[;,:.()%!\"#$%&/()=@{}\\[\\]'«»+*<>\\|]" = "", " +" = "-", "-+" = "-"))),
                                                  "-", RecipeId, sep = ""))

#Build user table
users <- merge(author.recipes,author.reviews,by = c("AuthorId","AuthorName"),all =TRUE, sort = TRUE)
users <- rename(users, "Id" = "AuthorId", "Name" = "AuthorName")

#Normalize column names
new.recipes <- rename(new.recipes, "Id" = "RecipeId", "UserId" = "AuthorId")
new.reviews <- rename(new.reviews, "Id" = "ReviewId", "UserId" = "AuthorId")

#Save clean files
write.csv(new.recipes,"data/clean_recipes.csv")
write.csv(new.reviews,"data/clean_reviews.csv")
write.csv(users,"data/users.csv")
