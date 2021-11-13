if (!require("skimr")) install.packages("skimr")
if (!require("lessR")) install.packages("lessR")

#Recipe Analysis
barplot(sort(table(new.recipes$RecipeCategory),decreasing = T))
plot(table(new.recipes$Calories),xlab = "Calories",ylab = "Num of Recipes")
plot(table(new.recipes$PrepTime),xlab = "Total Time",ylab = "Num of Recipes")
hist(as.numeric(format(as.Date(new.recipes$DatePublished, "%Y-%m-%d"),"%Y")), main = paste("Histogram of Recipes Per Year"),xlab = "Year",col =3)

#Reviews Analysis
hist(new.reviews$Rating, main = paste("Histogram of Ratings"),xlab = "Rating", col = 4)


summary(new.recipes)
summary(new.reviews)
