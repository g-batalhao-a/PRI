library(rmake)

rule <- rRule(target="test",script="clean_csv.R",depends=c("data/recipes.csv","data/reviews.csv"))

makefile(list(rule))

tmp <- getwd()
makefile(list(rule),file.path(tmp,"Makefile"))
