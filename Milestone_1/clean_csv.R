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

write.csv(users,"data/users.csv")


### Category Table
new.recipes$RecipeCategory <- as.factor(new.recipes$RecipeCategory)
categories.recipes <- levels(new.recipes$RecipeCategory)
categories <- data.frame("Id" = seq_len(length(categories.recipes)), "Name" = categories.recipes)
new.recipes$RecipeCategory <- as.numeric(new.recipes$RecipeCategory)

write.csv(categories, "data/categories.csv")


### Keywords table
keywords = c()
for (i in seq_len(nrow(new.recipes))) {
  row.keywords <- eval(parse(text = new.recipes$Keywords[i]))
  new.keywords <- row.keywords[which(!(row.keywords %in% keywords))]
  keywords <- append(keywords, new.keywords)
  if (i %% 1000 == 0) print(i)
}

keywords.recipes = levels(as.factor(keywords))
keywords.csv <- data.frame("Id" = seq_len(length(keywords.recipes)), "Name" = keywords.recipes)

new.recipes <- select(new.recipes, -c('Keywords'))

write.csv(keywords.csv, "data/keywords.csv")


### Ingredients Table
ingredients = c()
for (i in seq_len(nrow(new.recipes))) {
  row.ingredients <- eval(parse(text = new.recipes$RecipeIngredientParts[i]))
  new.ingredients <- row.ingredients[which(!(row.ingredients %in% ingredients))]
  ingredients <- append(ingredients, new.ingredients)
  if (i %% 1000 == 0) print(i)
}

ingredients.recipes = levels(as.factor(ingredients))
ingredients.csv <- data.frame("Id" = seq_len(length(ingredients.recipes)), "Name" = ingredients.recipes)

new.recipes <- select(new.recipes, -c('RecipeIngredientParts'))

write.csv(ingredients.csv, "data/ingredients.csv")


### Remove Hour from Dates
new.recipes <- separate(new.recipes, DatePublished, "DatePublished", sep = " ", extra = "drop")
new.reviews <- separate(new.reviews, DateModified, "DateModified", sep = " ", extra = "drop")


### Create Links
new.recipes <- new.recipes %>% mutate(URL = paste("https://www.food.com/recipe/", tolower(str_replace_all(str_replace_all(Name,"&quot;","\""), c("[;,:.()%!\"#$%&/()=@{}\\[\\]'«»+*<>\\|]" = "", " +" = "-", "-+" = "-"))),"-", Id, sep = ""))


### Recipe Image Parse
images.recipes <- select(new.recipes, c('Images'))
for (i in seq_len(nrow(images.recipes))) {
  image <- images.recipes$Images[i]
  
  if (image == "character(0)") {
    image <- NA
  } else if (substring(image, 1, 1) == "c") {
    image <- (eval(parse(text = image)))[1]
  } else {
    image <- substring(image, 2, nchar(image) - 1)
  }
  
  images.recipes$Images[i] <- image
  if (i %% 1000 == 0) print(i)
}
new.recipes$Images <- images.recipes$Images
new.recipes <- rename(new.recipes, "Image" = "Images")


### Recipe Instructions Parse
for (i in seq_len(nrow(new.recipes))) {
  instructions <- new.recipes$RecipeInstructions[i]
  if (substring(instructions, 1, 2) == "c(") {
    instructions <- eval(parse(text = instructions))
    instructions <- paste(instructions, collapse = " ")
  }
  else
    instructions <- substring(instructions, 2, -2)
  new.recipes$RecipeInstructions[i] <- instructions
  if (i %% 1000 == 0) print(i)
}


### Save clean files
write.csv(new.recipes,"data/clean_recipes.csv")
write.csv(new.reviews,"data/clean_reviews.csv")
