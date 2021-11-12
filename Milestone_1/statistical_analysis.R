if (!require("skimr")) install.packages("skimr")
if (!require("lessR")) install.packages("lessR")

#Recipe Analysis
barplot(sort(table(new.recipes$RecipeCategory),decreasing = T))
plot(table(new.recipes$Calories),xlab = "Calories",ylab = "Num of Recipes")

#Reviews Analysis
hist(new.reviews$Rating, main = paste("Histogram of Ratings"),xlab = "Rating")


summary(new.recipes)
summary(new.reviews)
