# Queries

### 1.

Person that has chicken in the fridge and wants to search for recipes that use it.

Query:
```
q: chicken
qf: Name Description Category Keywords Ingredients
```
`http://localhost:8983/solr/recipes/select?defType=edismax&indent=true&q.op=AND&q=chicken&qf=Name%20Description%20Category%20Keywords%20Ingredients%20Instructions&rows=100`

Boosted:
```
q: chicken
qf: Name^10 Description Category^2 Keywords Ingredients Instructions^2
```
`http://localhost:8983/solr/recipes/select?defType=edismax&indent=true&q.op=AND&q=chicken&qf=Name%5E10%20Description%20Category%5E2%20Keywords%20Ingredients%20Instructions%5E2&rows=100`


### 2. TODO SYNONYMS

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


### 3. TODO

### 4. TODO

### 5. TODO

---

### 1.

Pessoa que tem que fazer uma refeicao rapida de 250 calorias ou mais para conseguir comer antes de ir apanhar o comboio.

### 2.

Pessoa que acabou de conhecer outra pessoa com o nome XXX que faz receitas, e quer ver as receitas que essa pessoa publicou entre 2010 e 2012.

### 3.

Pessoa que anda no ginasio e tem frango e arroz, e quer fazer uma refeicao com pelo menos 80g de proteina para conseguir dividir em 4 porcoes de 20 gramas ou mais por porcao.
