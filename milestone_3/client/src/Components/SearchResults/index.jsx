import React from 'react';
import { Pagination } from '@mui/material';

import { ResultsContainer } from './style';
import Recipe from '../Recipe'

export default function SearchResults({ data, sendRequest }) {
  const handlePage = (event, value) => sendRequest({...data.queryParams, "page": value})

  const renderResults = () => {
    return (
      <>
      <Pagination count={data.pages} page={data.queryParams.page ? parseInt(data.queryParams.page) : 1} onChange={handlePage} onClick={window.scroll({top:0,behavior:'smooth'})} />
      <ResultsContainer>
        { data.recipes.map(entry => <Recipe key={entry.RecipeId} data={entry} />) }
      </ResultsContainer>
      <Pagination count={data.pages} page={data.queryParams.page ? parseInt(data.queryParams.page) : 1} onChange={handlePage} onClick={window.scroll({top:0,behavior:'smooth'})} />
      </>
    );
  }

  return (
    <div className="searchResults">
        { !data.recipes || data.recipes.length === 0 ? "No Results!" : renderResults() } 
    </div>
    
  );
}
