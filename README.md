# PRI

## TODO

- Criar script para correr com ou sem test dataset
- Criar copy fields para queries em vários fields (link: )
- Rever os field-types do texto, para já estamos a usar:
  - uiString - unindexed string para o que não queremos que seja pesquisável (URL e Images)
  - string - para o que queremos pesquisar mas não analisar (Type)
  - title - para o que queremos analisar e que seja possível fazer partial matching, ou seja [Query: Str]->[Strawberries, Struddel] em vez de ser preciso escrever a palavra completa (Name, RecipeCategory)
  - text_en - default do Solr para texto em inglês, sem partial match (Description, RecipeInstructions)
  Preciso ver se são os mais adequados para cada cena e experimentar mais queries
- Chorar