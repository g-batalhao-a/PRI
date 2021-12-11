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


### 3. Date and user

Get recipes of the user XXX between 2010 and 2015. (Dataset completo)

### 4. Reviews

Get contraditory reviews

### 5. Nutricional information

Pessoa que anda no ginasio e tem frango e arroz, e quer fazer uma refeicao com pelo menos 80g de proteina para conseguir dividir em 4 porcoes de 20 gramas ou mais por porcao.
