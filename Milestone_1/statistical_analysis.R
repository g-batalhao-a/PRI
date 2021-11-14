if (!require("skimr")) install.packages("skimr")
if (!require("lessR")) install.packages("lessR")

#Recipe Analysis
barplot(sort(table(new.recipes$RecipeCategory),decreasing = T))
plot(table(new.recipes$Calories),xlab = "Calories",ylab = "Num of Recipes", col=2,xaxt='n', main=paste("Calories Per Recipe"))
#modify x-axis interval
axis(side=1, at=seq(0, 4700, by=100))

plot(table(new.recipes$PrepTime),xlab = "Total Time",ylab = "Num of Recipes")
hist(as.numeric(format(as.Date(new.recipes$DatePublished, "%Y-%m-%d"),"%Y")), main = paste("Histogram of Recipes Per Year"),xlab = "Year",col =3)
graph.recipes <- filter(new.recipes, ReviewCount < 20 & ReviewCount > 0)
barplot(prop.table(table(graph.recipes$ReviewCount)), main = paste("Frequency of Reviews"), xlab = "Reviews", col = 7)

#Reviews Analysis
barplot(prop.table(table(new.reviews$Rating)), main = paste("Frequency of Ratings"), xlab = "Rating", col = 4)
hist(as.numeric(format(as.Date(new.reviews$DateModified, "%Y-%m-%d"),"%Y")), main = paste("Histogram of Reviews Per Year"),xlab = "Year",col =3)



summary(new.recipes)
summary(new.reviews)
