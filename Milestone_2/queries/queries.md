# Queries

### 1.

Person that has chicken in the fridge and wants to search for recipes that use it.

Query:
```
q: chicken
qf: Name Description Category Keywords Ingredients Instructions
```
`http://localhost:8983/solr/recipes/select?defType=edismax&indent=true&q.op=AND&q=chicken&qf=Name%20Description%20Category%20Keywords%20Ingredients%20Instructions&rows=100`

Boosted:
```
q: chicken
qf: Name^10 Description Category^2 Keywords Ingredients Instructions^2
```
`http://localhost:8983/solr/recipes/select?defType=edismax&indent=true&q.op=AND&q=chicken&qf=Name%5E10%20Description%20Category%5E2%20Keywords%20Ingredients%20Instructions%5E2&rows=100`


### 2.

Person that has just bought a new oven and wants to use it, but only has 1 hour to make something.

Query:
```
q: oven
fq: TotalTime:[* TO 3600]
qf: Description Keywords Instructions
```
`http://localhost:8983/solr/recipes/select?defType=edismax&fq=TotalTime%3A%5B*%20TO%203600%5D&indent=true&q.op=OR&q=oven&qf=Description%20Keywords%20Instructions&rows=100`

Boosted (Uses synonyms file to search for bake when searching oven):
```
q: oven
fq: TotalTime:[* TO 3600]
qf: Description Keywords^5 Instructions^2
```
`http://localhost:8983/solr/recipes/select?defType=edismax&fq=TotalTime%3A%5B*%20TO%203600%5D&indent=true&q.op=OR&q=oven&qf=Description%20Keywords%5E5%20Instructions%5E2&rows=100`


### 3.

Get recipes that only need small bowls, which are the only ones I have.

Query:
```
q: small bowl
qf: Name Description Instructions
```
`http://localhost:8983/solr/recipes/select?defType=edismax&indent=true&q.op=AND&q=small%20bowl&qf=Name%20Description%20Yield%20Instructions&rows=100`

Boosted:
```
q: small bowl
qf: Name Description Instructions
pf: Instructions^5
ps: 4
```
`http://localhost:8983/solr/recipes/select?defType=edismax&indent=true&pf=Instructions%5E5&ps=3&q.op=AND&q=small%20bowl&qf=Name%20Description%20Yield%20Instructions&rows=100`


### 4.

Get recipes that have reviews saying that it was easy to make.

Query:
```
q: easy to make
qf: Reviews
```
`http://localhost:8983/solr/recipes/select?defType=edismax&indent=true&q.op=OR&q=easy%20to%20make&qf=Reviews&rows=100`

Boosted:
```
q: easy to make
qf: Reviews
pf: Reviews^5
ps: 3
```
`http://localhost:8983/solr/recipes/select?defType=edismax&indent=true&pf=Reviews%5E5&ps=3&q.op=OR&q=easy%20to%20make&qf=Reviews&rows=100`


### 5.

Get Peter J's recipes published in 2008.

Query:
```
q: peter j
fq: Date:[2008-01-01T00:00:00Z TO 2012-01-01T00:00:00Z]
qf: AuthorName
```
`http://localhost:8983/solr/recipes/select?defType=edismax&fq=Date%3A%5B2008-01-01T00%3A00%3A00Z%20TO%202012-01-01T00%3A00%3A00Z%5D&indent=true&q.op=OR&q=peter%20j&qf=AuthorName&rows=100`

Boosted:
```
q: peter j
fq: Date:[2008-01-01T00:00:00Z TO 2012-01-01T00:00:00Z]
qf: AuthorName
pf: AuthorName^20
ps: 1
```
`http://localhost:8983/solr/recipes/select?defType=edismax&fq=Date%3A%5B2008-01-01T00%3A00%3A00Z%20TO%202012-01-01T00%3A00%3A00Z%5D&indent=true&pf=AuthorName%5E20&ps=1&q.op=OR&q=peter%20j&qf=AuthorName&rows=100`


