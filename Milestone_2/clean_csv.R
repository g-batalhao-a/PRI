#rm(list = ls())

if (!require("readr")) install.packages("readr")
if (!require("dplyr")) install.packages("dplyr")
if (!require("lubridate")) install.packages("lubridate")
if (!require("stringr")) install.packages("stringr")
if (!require("tidyr")) install.packages("tidyr")

### Import Datasets
recipes <- read_csv("data/recipes.csv")
reviews <- read_csv("data/reviews.csv")


### Remove Unused Columns
new.recipes <- select(recipes, -c('RecipeIngredientQuantities'))
new.reviews <- select(reviews, -c('DateSubmitted'))


### Normalize column names
new.recipes <- rename(new.recipes, "Id" = "RecipeId", "UserId" = "AuthorId")
new.reviews <- rename(new.reviews, "Id" = "ReviewId", "UserId" = "AuthorId")

# Remove NA values
new.recipes$ReviewCount[is.na(new.recipes$ReviewCount)] = 0

### Parse Times
new.recipes$CookTime <- as.numeric(duration(new.recipes$CookTime))
new.recipes$CookTime[is.na(new.recipes$CookTime)] = 0

new.recipes$PrepTime <- as.numeric(duration(new.recipes$PrepTime))
new.recipes$PrepTime[is.na(new.recipes$PrepTime)] = 0

new.recipes$TotalTime <- as.numeric(duration(new.recipes$TotalTime))
new.recipes$TotalTime[is.na(new.recipes$TotalTime)] = 0


### Remove Outliers
outlier_data <- select_if(new.recipes,is.numeric) %>% select(-c('Id','UserId','AggregatedRating','ReviewCount','RecipeServings'))
z_scores <- as.data.frame(sapply(outlier_data, function(data) (abs(data-mean(data))/sd(data))))
new.recipes <- new.recipes[!rowSums(z_scores>3), ]
new.recipes <- filter(new.recipes, Calories > 0 & TotalTime > 0)


### Users Table
author.recipes <- select(new.recipes, c('UserId', 'AuthorName'))
author.recipes <- distinct(author.recipes,.keep_all = TRUE)
author.reviews <- select(new.reviews, c('UserId', 'AuthorName'))
author.reviews <- distinct(author.reviews,.keep_all = TRUE)

users <- merge(author.recipes, author.reviews, by = c("UserId","AuthorName"), all =TRUE, sort = TRUE)
users <- distinct(users, .keep_all = TRUE)
users <- rename(users, "Id" = "UserId", "Name" = "AuthorName")

new.recipes <- select(new.recipes, -c('AuthorName'))
new.reviews <- select(new.reviews, -c('AuthorName'))

write.csv(users,"data/solr/users.csv")


### Parse Keywords
for (i in seq_len(nrow(new.recipes))) {
  keywords <- new.recipes$Keywords[i]

  if (is.na(keywords)) {
    next
  } else if (substring(keywords, 1, 1) == "c") {
    keywords <- gsub("\"", "", substring(keywords, 3, nchar(keywords) - 1))
  } else {
    keywords <- substring(keywords, 2, nchar(keywords) - 1)
  }

  new.recipes$Keywords[i] = keywords
  if (i %% 1000 == 0) print(i)
}


### Parse Ingredients
for (i in seq_len(nrow(new.recipes))) {
  ingredients = new.recipes$RecipeIngredientParts[i]

  if (ingredients == "character(0)") {
    ingredients <- NA
  } else if (substring(ingredients, 1, 1) == "c") {
    ingredients <- gsub("\"", "", substring(ingredients, 3, nchar(ingredients) - 1))
  } else {
    ingredients <- substring(ingredients, 2, nchar(ingredients) - 1)
  }

  new.recipes$RecipeIngredientParts[i] = ingredients
  if (i %% 1000 == 0) print(i)
}


### Remove Hour from Dates
new.recipes <- separate(new.recipes, DatePublished, "DatePublished", sep = " ", extra = "drop")
new.reviews <- separate(new.reviews, DateModified, "DateModified", sep = " ", extra = "drop")


### Create Links
new.recipes <- new.recipes %>% mutate(URL = paste("https://www.food.com/recipe/", tolower(str_replace_all(str_replace_all(Name,"&quot;","\""), c("[;,:.()%!\"#$%&/()=@{}\\[\\]'«»+*<>\\|]" = "", " +" = "-", "-+" = "-"))),"-", Id, sep = ""))


### Recipe Image Parse
for (i in seq_len(nrow(new.recipes))) {
  image <- new.recipes$Images[i]

  if (image == "character(0)") {
    image <- NA
  } else if (substring(image, 1, 1) == "c") {
    image <- gsub("\"", "", substring(image, 3, nchar(image) - 1))
  } else {
    image <- substring(image, 2, nchar(image) - 1)
  }

  new.recipes$Images[i] <- image
  if (i %% 1000 == 0) print(i)
}


### Recipe Instructions Parse
for (i in seq_len(nrow(new.recipes))) {
  instructions <- new.recipes$RecipeInstructions[i]

  if (instructions == "character(0)") {
    instructions <- NA
  } else if (substring(instructions, 1, 1) == "c") {
    instructions <- gsub("\"", "", substring(instructions, 3, nchar(instructions) - 1))
  } else {
    instructions <- substring(instructions, 2, nchar(instructions) - 1)
  }

  new.recipes$RecipeInstructions[i] <- instructions
  if (i %% 1000 == 0) print(i)
}


### Save clean files
write.csv(new.recipes,"data/solr/recipes.csv")
write.csv(new.reviews,"data/solr/reviews.csv")
